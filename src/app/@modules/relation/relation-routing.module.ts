import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { AuthGuard } from '../../@shared/route-guards/auth.guard';

const routes: Routes = [

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RelationRoutingModule { }
