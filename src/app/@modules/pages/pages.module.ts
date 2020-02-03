import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../../@shared/shared.module';

import { DashboardViewComponent } from './views/dashboard-view/dashboard-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';

@NgModule({
    declarations: [
        DashboardViewComponent,
		LoginViewComponent
    ],
    exports: [
        DashboardViewComponent,
		LoginViewComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
		HttpClientModule,
        SharedModule
    ]
})
export class PagesModule { }
