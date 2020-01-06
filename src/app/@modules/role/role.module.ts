import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { RoleStoreService } from './store/role-store';
import { roleModuleReducer } from './store/reducers/role.reducers';
import { RoleModuleEffects } from './store/effects/role.effects';

import { CoreModule } from '../../@core/core.module';
import { SharedModule } from '../../@shared/shared.module';
import { RoleRoutingModule } from './role-routing.module';

import { RoleViewComponent } from './views/role-view/role-view.component';
import { RoleListComponent } from './views/role-view/role-list/role-list.component';
import { RoleFormComponent } from './views/role-view/role-form/role-form.component';
import { RolePermissionTableComponent } from './views/role-view/role-permission-table/role-permission-table.component';

@NgModule({
    declarations: [
        RoleViewComponent,
        RoleListComponent,
        RoleFormComponent,
        RolePermissionTableComponent
    ],
    exports: [
        RoleViewComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        RoleRoutingModule,
        StoreModule.forFeature('roleModule', roleModuleReducer),
        EffectsModule.forFeature([RoleModuleEffects])
    ],
    providers: [
        RoleStoreService
    ]
})
export class RoleModule { }
