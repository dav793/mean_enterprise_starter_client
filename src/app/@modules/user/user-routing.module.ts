import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileViewComponent } from './views/profile-view/profile-view.component';
import { UserListViewComponent } from './views/user-list-view/user-list-view.component';
import { UserRegisterViewComponent } from './views/user-register-view/user-register-view.component';

import { AuthGuard } from '../../@shared/route-guards/auth.guard';

const userRoutes: Routes = [
    { path: 'list',           component: UserListViewComponent,			canActivate: [AuthGuard] },
    { path: 'profile/:id',    component: ProfileViewComponent,			canActivate: [AuthGuard] },
    { path: 'profile',        component: ProfileViewComponent,     		canActivate: [AuthGuard] },
	{ path: 'register',       component: UserRegisterViewComponent,     						 },
    { path: '', redirectTo: 'profile', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
