import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleViewComponent } from './views/role-view/role-view.component';

import { AuthGuard } from '../../@shared/route-guards/auth.guard';

const routes: Routes = [
    { 
        path: '', 
        component: RoleViewComponent, canActivate: [AuthGuard] 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoleRoutingModule { }
