# Front-End Client - Technical Doc

## Index
* [Feature Modules](#feature-modules)
* [Resources](#resources)
* [Socket Messages](#socket-messages)
* [User Sessions](#user-sessions)
* [Dialog Module](#dialog-module)
* [Store](#store)
* [CSS](#css)
* [Miscellaneous](#miscellaneous)

## Feature Modules

Import individual feature modules in `app.module.ts`. 

## Resources

The enum `src/app/@shared/enums/resources.ts` which lists the app resources, should **always** be identical to the corresponding one in the server project. 

## Socket Messages

The front-end client can listen to socket messages initiated from the server at any moment. This allows for server-initiated communication with individual clients. Coupled with HTTP requests for client-initiated communication with the server, it allows for full-duplex communication between the client and server.

One thing to note is that, by application design, socket messages are only sent by the server to a client, but not the other way around. For that we already have HTTP requests. 

Another thing to note is that this constraint makes sense for now, but it is subject to change at any time in the future, provided there is sufficient reason.

Socket messages are streamed on `ServerEventStreamService`'s property `stream$`. Subscribe to it to pick up all socket messages (as type `ISocketMessage`) received by the client instance:

```typescript
	import { filter } from 'rxjs/operators';

	import { ServerEventStreamService } from './src/app/@shared/services/server-event-stream.service';
    import { ISocketMessage, SocketMessageType } from './src/app/@shared/lib/socket-io/socket-types';

	this.serverEventService.stream$.pipe(
		filter(msg => msg.type === SocketMessageType.REQUEST_AUTHENTICATION)
	).subscribe((message: ISocketMessage) => {
	    ...
	});
```

Socket messages intended to cause operations on core store resources, should be listened/subscribed to in `CoreStoreService`'s method `listenServerEvents`.

For info on how to funnel socket messages into the Store, see [Having the Store listen to Socket Messages](#having-the-store-listen-to-socket-messages).

## User Sessions

User sessions are stored in each client's local storage as a JWT.

The variable in local storage is named `session`, and it contains the user id in `uid` and the JTW in `token`

However you should not access local storage directly. If you need to access the active session data,
you should use `UserSessionProviderService`'s method `getSessionData()`.

As an example:
```typescript
	import { ISessionData } from './src/app/@core/user/user-session.service';
	import { UserSessionProviderService } from './src/app/@core/user/user-session-provider.service';
	
	class MyComponent {
	    
	    constructor(
	        private userSessionProviderService: UserSessionProviderService
	    ) {
	        const session: ISessionData = this.userSessionProviderService.getSessionData();
	        console.log(session.uid);
	        console.log(session.token);
	    }
	    
	}
```

## Dialog Module

Use the components in `src/app/@shared/components/dialogs` to present dialogs or modals.

Use `DialogService` to show dialogs, like so: 

```typescript
	import { DialogService } from './src/app/@shared/services/dialog.service';

	this.dialogService.openYesNoDialog({
		title: 'Confirmar',
		body: '¿Desea actualizar los datos cargados localmente?'
	}).subscribe(
	    response => {
	        ...
	    }
	);
```

## Store

The front-end client uses NgRx to support application-wide state management. The store is divided into a single Core Store and several Feature Stores
in order to promote modularity. The `CoreStoreService` is located in `@core/store/core-store.ts`, while individual Feature Stores are always located in a directory named `store` inside of its corresponding module directory. 

Please do not dispatch store actions or select store state in your components or services; use the `CoreStoreService` or any of the feature store services instead.

### Having the Store listen to Socket Messages

When adding support for new types of socket messages, you may funnel them into a core store action by adding them in `CoreStoreService`'s `listenServerEvents` method, like so:

```typescript
	this.serverEventService.stream$.pipe(
		filter(msg => msg.type === SocketMessageType.MY_NEW_SOCKET_MESSAGE_TYPE)
	).subscribe((message: ISocketMessage) => {
		this.store.dispatch( new SomeModuleActions.ServerEventUpdateSomeModule({ message }) );
	});
```

## CSS

For a set of classes to use to style your elements in your templates, see `src/assets/css/_common.scss`.

Please try not to create your own styles if one of these classes would work just as well. It will help with theming and such.

### Buttons

To style button elements, add class `app-btn` as well as one of the `mat-*-button` variants as an attribute. The button variant attributes are listed in the [Angular Material Docs](https://material.angular.io/components/button/overview).

Add one of the following classes to denote color scheme:
* `primary`: primary theme color
* `accent`: secondary (accent) theme color
* `warn`: yellow warning color
* `success`: green success color
* `error`: red error color

Add one of the following classes to denote size:
* `size-xs`: extra-small
* `size-sm`: small
* `size-md`: medium/regular
* `size-lg`: large  

For example:
```html
<button class="app-btn primary size-xs" mat-raised-button>
	Nuevo <mat-icon aria-hidden="false" aria-label="Add Role">add_circle_outline</mat-icon>
</button>
```

### Icons

Add an icon by adding a `mat-icon` element with the icon identifier as element body. 

For example:
```html
<mat-icon>add_circle_outline</mat-icon>
```

Available icons are listed in the [Material Design Docs](https://material.io/resources/icons/?style=baseline).

### Grid

To position elements in a grid layout, use the 12-column helper classes in `src/assets/css/_grid.css`.

To use it, apply the `app-grid` class to the grid wrapper element and add the cell elements as children. Then, position each cell using the `grid-column` and `grid-row` properties, as per CSS Grid.

More info in the aforementioned stylesheet or in the [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Realizing_common_layouts_using_CSS_Grid_Layout). 

## Miscellaneous

### ClientId

Individual client tabs in the browser are uniquely identified using the ID automatically assigned by the socket connection (in the server). The ClientId is provided at application start (or anytime the connection may be reset) through a socket message of type `ASSIGN_CLIENT_ID`.

In (almost) every API request made by the client, its assigned ClientId is included as a custom header named `App-Client-Id`. In many cases the server will fail the request if this header is not included.

You can include it and every other required header in your API requests by simply using `HttpOptionsFactoryService`'s method `getDefaultHttpOptions()`, like so:

```typescript
	import { HttpClient } from '@angular/common/http';
	import { HttpOptionsFactoryService } from './src/app/@shared/services/http-options-factory.service';	

	class MyComponent {
    	
    	constructor(
    		private httpOptionsFactory: HttpOptionsFactoryService,
    		private http: HttpClient
    	) {
    	    
    	    const httpOptions = this.httpOptionsFactory.getDefaultHttpOptions();
            
			this.http.get(url, httpOptions);
			this.http.post(url, body, httpOptions);
    	    
    	}
    
	}
```
