import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../../@shared/shared.module';

import { DashboardViewComponent } from './views/dashboard-view/dashboard-view.component';

@NgModule({
    declarations: [
        DashboardViewComponent
    ],
    exports: [
        DashboardViewComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
		HttpClientModule,
        SharedModule
    ]
})
export class PagesModule { }
