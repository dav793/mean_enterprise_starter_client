import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserGroupStoreService } from './store/user-group-store';
import { userGroupModuleReducer } from './store/reducers/user-group.reducers';
import { UserGroupModuleEffects } from './store/effects/user-group.effects';

import { CoreModule } from '../../@core/core.module';
import { SharedModule } from '../../@shared/shared.module';
import { UserGroupRoutingModule } from './user-group-routing.module';

import { UserGroupViewComponent } from './views/user-group-view/user-group-view.component';
import { UserGroupListComponent } from './views/user-group-view/user-group-list/user-group-list.component';
import { UserGroupFormComponent } from './views/user-group-view/user-group-form/user-group-form.component';

@NgModule({
	declarations: [
		UserGroupViewComponent,
		UserGroupListComponent,
		UserGroupFormComponent
	],
	exports: [
		UserGroupViewComponent
	],
	imports: [
		CommonModule,
		CoreModule,
		SharedModule,
		UserGroupRoutingModule,
		StoreModule.forFeature('userGroupModule', userGroupModuleReducer),
		EffectsModule.forFeature([UserGroupModuleEffects])
	],
	providers: [
		UserGroupStoreService
	]
})
export class UserGroupModule { }
