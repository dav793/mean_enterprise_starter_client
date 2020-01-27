import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { FormInputsComponent } from './@modules/test/views/form-inputs/form-inputs.component';
import { LoginViewComponent } from './@modules/user/views/login-view/login-view.component';
import { UserRegisterViewComponent } from './@modules/user/views/user-register-view/user-register-view.component';
import { DashboardViewComponent } from './@modules/pages/views/dashboard-view/dashboard-view.component';

// import { UserModule } from './@modules/user/user.module';
import { RoleModule } from './@modules/role/role.module';
// import { UserGroupModule } from './@modules/user-group/user-group.module';
import { ContactModule } from './@modules/contact/contact.module';

import { AuthGuard } from './@shared/route-guards/auth.guard';

const routes: Routes = [
    // { path: 'users', loadChildren: () => UserModule },
    { path: 'users', loadChildren: './@modules/user/user.module#UserModule' },
    // { path: 'userGroups', loadChildren: () => UserGroupModule },
    { path: 'userGroups', loadChildren: './@modules/user-group/user-group.module#UserGroupModule' },
    { path: 'roles', loadChildren: () => RoleModule },
	{ path: 'contacts', loadChildren: () => ContactModule },
    // { path: 'tests/form-inputs', component: FormInputsComponent },
    { path: 'tests/form-inputs', loadChildren: './@modules/test/test.module#TestModule' },
    // { path: 'login', component: LoginViewComponent },
	// { path: 'register', component: UserRegisterViewComponent },
    { path: 'dashboard', component: DashboardViewComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'users', pathMatch: 'full' }   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
