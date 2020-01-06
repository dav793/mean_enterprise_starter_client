import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../@shared/shared.module';

import { LayoutContainerComponent } from './layout-container/layout-container.component';
import { LayoutNavComponent } from './layout-nav/layout-nav.component';
import { LayoutSidenavComponent } from './layout-sidenav/layout-sidenav.component';

@NgModule({
    declarations: [
        LayoutContainerComponent,
        LayoutNavComponent,
        LayoutSidenavComponent
    ],
    exports: [
        LayoutContainerComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ]
})
export class LayoutModule { }
