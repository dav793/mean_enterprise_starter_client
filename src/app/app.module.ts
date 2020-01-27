
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './@core/core.module';
import { SharedModule } from './@shared/shared.module';

// feature modules here
import { LayoutModule } from './@modules/layout/layout.module';
import { PagesModule } from './@modules/pages/pages.module';
// import { UserModule } from './@modules/user/user.module';
import { RoleModule } from './@modules/role/role.module';
// import { UserGroupModule } from './@modules/user-group/user-group.module';
import { ContactModule } from './@modules/contact/contact.module';
import { TestModule } from './@modules/test/test.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,                       // Retains last 25 states
            logOnly: environment.production,  // Restrict extension to log-only mode in production
        }),
        CoreModule.forRoot(),
        SharedModule.forRoot(),
        LayoutModule,
        PagesModule,
        // UserModule,
        RoleModule,
		// UserGroupModule,
		ContactModule,
        TestModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: preload,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

function preload(): () => Promise<boolean> {
  return (): Promise<boolean> => {
    return new Promise<boolean>( (resolve: (a: boolean) => void): void => {

      // the tasks here will be executed before any of the angular stuff begins
      // @todo: add pre loading tasks as needed (fetch config via http, etc)

      console.log(`pre-loading step completed.`);
      console.log(`env: ${environment.env_name}`);

      resolve(true);
    });
  };
}
