import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactViewComponent } from './views/contact-view/contact-view.component';

import { AuthGuard } from '../../@shared/route-guards/auth.guard';

const routes: Routes = [
	{ path: 'view/:id',    component: ContactViewComponent,			canActivate: [AuthGuard] },
	{ path: 'view',        component: ContactViewComponent,     	canActivate: [AuthGuard] },
	{ path: '', redirectTo: 'view', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ContactRoutingModule { }
