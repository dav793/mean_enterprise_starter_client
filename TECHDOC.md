# Front-End Client - Technical Doc

## Index
* [Feature Modules](#feature-modules)
* [Resources](#resources)
* [Socket Messages](#socket-messages)
* [User Sessions](#user-sessions)
* [Toolbar Module](#toolbar-module)
* [Dialog Module](#dialog-module)
* [Form Elements Module](#form-elements-module)
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

## Toolbar Module

**@todo**: write this

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

## Form Elements Module

**@todo**: write this

## Store

The front-end client uses NgRx to support application-wide state management. The store is divided into a single Core Store and several Feature Stores
in order to promote modularity. The `CoreStoreService` is located in `@core/store/core-store.ts`, while individual Feature Stores are always located in a directory named `store` inside of its corresponding module directory. 

Please **do not dispatch store actions or select store state in your components or services**; use the `CoreStoreService` or any of the feature store services instead.

### Core Store

The core store deals with operations and state which possess a global nature, in that they should be able to operate
independently of any feature modules. 

One example is active session data. Another example is operations which
result in server API calls, and which may result in changes to the global data (or "state") that is kept by the client application. These include fetching all the users, or updating a single role, to name a couple.

Lets look at the core store actions which relate to the User entity, which are located in `@core/store/actions/users.actions.ts`:

```typescript
RegisterUser				= '[User Register View] Register User',
RemoveUser                  = '[User] Remove User',
CreateUser                  = '[User] Create User',
UpdateUser                  = '[User] Update User',
DeleteUser                  = '[User] Delete User',
LoadUser                    = '[User] Load User',
LoadAllUsers                = '[User] Load All Users',
APICreateUserSuccess        = '[User API] Created User Success',
APICreateUserError          = '[User API] Created User Error',
APIUpdateUserSuccess        = '[User API] Updated User Success',
APIUpdateUserError          = '[User API] Updated User Error',
APIDeleteUserSuccess        = '[User API] Deleted User Success',
APIDeleteUserError          = '[User API] Deleted User Error',
APILoadAllUsersSuccess      = '[User API] Loaded All Users Success',
APILoadAllUsersError        = '[User API] Loaded All Users Error',
ServerEventUpdateUsers      = '[Server Event] Update Users',
NoOp                        = '[User] No Operation'
``` 

As you can see, there is an action for every event that may result in a server API call. In the case of
the event of updating a single User, that action is named `UpdateUser`. For each of these there is in turn
two actions, one for each of the possible server API responses (success and error). These are named 
`APIUpdateUserSuccess` and `APIUpdateUserError`. 

Note that if the server API call were to directly result in client state modification, it would be the job of the **reducer**
for the Success action to perform such modification. Nevertheless, in this particular case the client state modification is performed by the `APILoadAllUsersSuccess` action, which is eventually triggered after the update 
has been completed. Sure, the `UpdateUser` action may cause the User instance in the server to be modified, but this will in turn cause the server
to notify all active clients of such modification, which will dispatch the `LoadAllUsers` action that may ultimately result in the update of client state.

This design allows every active client to be immediately and passively affected by the User modification with ease, and not just the client that originated the request.

On the other hand, the Error action registers the failure of the operation, so that any feature modules that need to respond to such an event
may capture the Error action and respond accordingly.

An example of an **effects** function that reproduces this behavior is found in `@core/store/effects/users.effects.ts`:

```typescript
@Effect()
    updateUser = this.actions$.pipe(
        ofType(UsersActions.ActionTypes.UpdateUser),
        mergeMap((a: UsersActions.UpdateUser) => {

            const toast = this.toaster.showSaving();

            return this.userApiService.putUser(a.payload.userId, a.payload.user).pipe(
                tap(user => console.log(`saved user ${user._id} to API server`)),
                map(user => {

                    return {
                        type: UsersActions.ActionTypes.APIUpdateUserSuccess,
                        payload: {
                            user,
                            overrideToastId: toast.toastId,
                            meta: a.payload.meta
                        }
                    };

                }),
                catchError(error => {

					a.payload.meta.errorCode = Util.getErrorSigFromServerErrorString(error.error) as ErrorCode;

                    return of({
                        type: UsersActions.ActionTypes.APIUpdateUserError,
                        payload: {
                            error,
                            overrideToastId: toast.toastId,
                            meta: a.payload.meta
                        }
                    });

                })

            );

        })
    );
```  

Here you can see that the initial `UpdateUser` action (typically triggered by some component inside a feature module) performs the server API call `userApiService.putUser`
and then branches off into one of two response actions; `APIUpdateUserSuccess` or `APIUpdateUserError`.

The result of this implementation is that any component or service that wants to update an User, just needs to call `CoreStoreService`'s `updateUser()` method to trigger this entire sequence of events.

### Feature Stores

Each feature may include a store module, which may perform any operations needed by the feature module.
 
For example, the user module's feature store defines an action for each event it should capture and respond to in some way, as seen in `@modules/user/store/actions/user.actions.ts`:

```typescript
UserUpdateSuccess 		= '[User Module] User Update Success',
UserUpdateError 		= '[User Module] User Update Error',
UserCreateSuccess 		= '[User Module] User Create Success',
UserCreateError 		= '[User Module] User Create Error',
UserDeleteSuccess 		= '[User Module] User Delete Success',
UserDeleteError 		= '[User Module] User Delete Error',
UserLoadAllSuccess 		= '[User Module] User Load All Success',
UserLoadAllError 		= '[User Module] User Load All Error'
```

These actions are triggered in response to the core store's API Success or Error actions, as you may see in `@modules/user/store/effects/user.effects.ts`:

```typescript
@Effect()
userUpdateSuccess$ = this.actions$.pipe(
	ofType(UserActions.ActionTypes.APIUpdateUserSuccess),
	map((a: UserActions.APIUpdateUserSuccess) => {

		return {
			type: UserModuleActions.ActionTypes.UserUpdateSuccess,
			payload: {
				userId: a.payload.user._id,
				meta: a.payload.meta
			}
		};

	})
);

@Effect()
userUpdateError$ = this.actions$.pipe(
	ofType(UserActions.ActionTypes.APIUpdateUserError),
	map((a: UserActions.APIUpdateUserError) => {

		return {
			type: UserModuleActions.ActionTypes.UserUpdateError,
			payload: { meta: a.payload.meta }
		};

	})
);
```

The resulting state of the actions `UserUpdateSuccess` and `UserUpdateError` (as well as every other action in `@modules/user/store/actions/user.actions.ts`) has a structure according to the type `FeatureStoreOperationState`, as defined in `@core/store/feature-store-types.ts`,
and it looks like this:

```typescript
export interface FeatureStoreOperationState {
	successEventId: string;
	successInstanceId: string;
	errorEventId: string;
	errorCode: ErrorCode;
}
```

Its properties are:

* `successEventId` : The unique event ID for this event, if the action represents a successful operation. Otherwise it is null. See [Action Metadata](#action-metadata) below for more information on this event ID. 

* `successInstanceId` : If the operation was targeted towards a single instance of any entity (i.e. User update/create/delete), then this is the `_id` property of such an instance, in the event the action
represents a successful operation. Otherwise it is null.

* `errorEventId` : The unique ID for this event, if the action represents a failed operation. Otherwise it is null. Once again, see [Action Metadata](#action-metadata) below for more information on this event ID.

* `errorCode` : The error code which identifies the type of the error that occurred, if the action represents a failed operation. Otherwise it is null. 
This error code is one of the error types defined in `@shared/enums/errors.ts`. 

This allows you to dispatch an operation in your components or services (for example a User update), wait for the response of that operation (whether it succeeded or failed), and then react accordingly.

An example of this can be seen in the `ProfileViewComponent` component located in `@modules/user/views/profile-view/profile-view.component.ts`. There, the `saveUser()` method triggers a User update as follows:

```typescript
saveUser(userId: string, userFormValue: any) {
	if (!userFormValue)
	  return;

	const actionMetadata: IActionMetadata = this.coreStore.updateUser(userId, userFormValue);
	this.handleUpdateResponse(actionMetadata);
}
```

You can see that the `CoreStore`'s `updateUser()` method returns the metadata generated for that action, as should be the case for every store method that dispatches an action.

Then, the method `handleUpdateResponse()` waits for and handles the response for the User update:

```typescript
handleUpdateResponse(actionMetadata: IActionMetadata) {

	const responseHandler: Observable<FeatureStoreOperationState> = this.userStore.selectUserUpdate()
		.pipe(
			filter(state => state.successEventId === actionMetadata.eventId),	// when receiving success response...
			first(),
			mergeMap(state => this.user$.pipe(		// ...wait to receive the updated user...
				first(),
				map(() => state)
			)),
			takeUntil(this.onDestroy$)
		);

	const errorHandler: Observable<FeatureStoreOperationState> = this.userStore.selectUserUpdate()
		.pipe(
			filter(state => state.errorEventId === actionMetadata.eventId),	// when receiving error response...
			first(),
			mergeMap(state => {
				const err = new Error();
				err.name = actionMetadata.errorCode;
				return throwError(err);				// ...throw error...
			}),
			takeUntil(this.onDestroy$)
		);

	merge(responseHandler, errorHandler).pipe(
		first(),						// wait for either success or error to occur...
		takeUntil(this.onDestroy$)
	).subscribe(
		state => {},					// ...handle success
		err => console.error(err)		// ...handle error
	);

}
``` 

This is how you can use the core store and feature stores inside your components and services to dispatch an action and handle the response. 

### Action Metadata

Every action (whether defined in the core store or any feature store) may contain a metadata property in its payload, named `meta`, which is of type `IActionMetadata`. This type is defined in `@shared/helpers/utils/store-action-metadata-factory.ts` as follows:

```typescript
export interface IActionMetadata {
	clientId?: string;
	eventId?: string;
	forceFetch?: boolean;
	errorCode?: ErrorCode;
}
``` 

Its properties are:

* `clientId` : The client ID for this particular client instance (see [ClientId](#clientid)).

* `eventId` : The unique ID for this event. An event (in this case) can be thought of as a chain of actions that together form an instance of a cohesive process. 
For example, a component belonging to a feature module tries to update an user by calling `CoreStoreService`'s `updateUser()` method. The core store assigns a unique `eventId` for this operation, 
and dispatches the `UpdateUser` action. Once the server responds, this will in turn dispatch either the `APIUpdateUserSuccess` or `APIUpdateUserError` action. 
Finally, the component waits for the response by listening to the feature store's `UserUpdateSuccess` or `UserUpdateError` actions, which it does by calling `UserStoreService`'s `selectUserUpdate()` method.
All of these actions would share the same `eventId` initially assigned by the store, which groups all these actions and separates them from different instances of the same process.

* `forceFetch` : When the action may result in a server API fetch, most of the time the server call will be bypassed if the data is already present in the client store, unless `forceFetch` is set to `true`.
This has no effect if the action would not result in a server API fetch.

* `errorCode` : If the action represents an error, this contains the code that identifies that error type, as defined in `@shared/enums/errors.ts`.

### Having the Store listen to Socket Messages

When adding support for new types of socket messages, you may funnel them into a core store action by adding them in `CoreStoreService`'s `listenServerEvents` method, like so:

```typescript
	this.serverEventService.stream$.pipe(
		filter(msg => msg.type === SocketMessageType.MY_NEW_SOCKET_MESSAGE_TYPE)
	).subscribe((message: ISocketMessage) => {
		this.store.dispatch( new SomeModuleActions.ServerEventUpdateSomeModule({ message }) );
	});
```

The core store listens to and reacts to such an event in the appropriate **effects** class.

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

In (almost) every API request made by the client, its assigned ClientId is included as a custom header named `App-Client-Id`. In many cases the server will reject a request if this header is not present.

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
