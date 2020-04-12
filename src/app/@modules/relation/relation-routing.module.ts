import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelationListViewComponent } from './views/relation-list-view/relation-list-view.component';

import { AuthGuard } from '../../@shared/route-guards/auth.guard';

const routes: Routes = [

	{ path: 'list',        component: RelationListViewComponent,     canActivate: [AuthGuard] },
	{ path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RelationRoutingModule { }
