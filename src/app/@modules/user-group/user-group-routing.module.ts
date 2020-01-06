import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserGroupViewComponent } from './views/user-group-view/user-group-view.component';

import { AuthGuard } from '../../@shared/route-guards/auth.guard';

const routes: Routes = [
	{ path: '', component: UserGroupViewComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserGroupRoutingModule { }
