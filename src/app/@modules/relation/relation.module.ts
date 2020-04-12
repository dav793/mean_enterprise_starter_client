import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { RelationStoreService } from './store/relation-store';
import { relationModuleReducer } from './store/reducers/relation.reducers';
import { RelationModuleEffects } from './store/effects/relation.effects';

import { CoreModule } from '../../@core/core.module';
import { SharedModule } from '../../@shared/shared.module';
import { RelationRoutingModule } from './relation-routing.module';

import { RelationDefinitionListTableComponent } from './views/relation-list-view/relation-list-table/relation-list-table.component';
import { RelationListViewComponent } from './views/relation-list-view/relation-list-view.component';

@NgModule({
	declarations: [
		RelationDefinitionListTableComponent,
		RelationListViewComponent
	],
	exports: [
		RelationListViewComponent
	],
	imports: [
		CommonModule,
		CoreModule,
		SharedModule,
		RelationRoutingModule,
		StoreModule.forFeature('relationModule', relationModuleReducer),
		EffectsModule.forFeature([RelationModuleEffects])
	],
	providers: [
		RelationStoreService
	]
})
export class RelationModule { }
