import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule } from '../../@core/core.module';
import { SharedModule } from '../../@shared/shared.module';

import { FormsModule } from '@angular/forms';

import { UserStoreService } from './store/user-store';
import { userModuleReducer } from './store/reducers/user.reducer';
import { UserModuleEffects } from './store/effects/user.effects';

import { ProfileViewComponent } from './views/profile-view/profile-view.component';
import { ProfileLeftLaneComponent } from './views/profile-view/profile-left-lane/profile-left-lane.component';
import { ProfileRightLaneComponent } from './views/profile-view/profile-right-lane/profile-right-lane.component';

import { UserListViewComponent } from './views/user-list-view/user-list-view.component';
import { UserListTableComponent } from './views/user-list-view/user-list-table/user-list-table.component';
import { UserRegisterViewComponent } from './views/user-register-view/user-register-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';

import { UserRoutingModule } from './user-routing.module';

@NgModule({
    declarations: [
        ProfileViewComponent,
        ProfileLeftLaneComponent,
        ProfileRightLaneComponent,
        UserListViewComponent,
        UserListTableComponent,
        UserRegisterViewComponent,
        LoginViewComponent
    ],
    exports: [
        ProfileViewComponent,
        UserListViewComponent,
        UserRegisterViewComponent,
        LoginViewComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        UserRoutingModule,
        SharedModule,
        FormsModule,
        StoreModule.forFeature('userModule', userModuleReducer),
        EffectsModule.forFeature([UserModuleEffects])
    ],
    providers: [
        UserStoreService
    ]
})
export class UserModule {}
