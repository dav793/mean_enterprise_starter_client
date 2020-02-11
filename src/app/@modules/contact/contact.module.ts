import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ContactStoreService } from './store/contact-store';
import { contactModuleReducer } from './store/reducers/contact.reducers';
import { ContactModuleEffects } from './store/effects/contact.effects';

import { CoreModule } from '../../@core/core.module';
import { SharedModule } from '../../@shared/shared.module';
import { ContactRoutingModule } from './contact-routing.module';

import { ContactViewComponent } from './views/contact-view/contact-view.component';
// import { ContactFormComponent } from './views/contact-view/contact-form/contact-form.component';
import { ContactListViewComponent } from './views/contact-list-view/contact-list-view.component';
import { ContactListTableComponent } from './views/contact-list-view/contact-list-table/contact-list-table.component';

@NgModule({
	declarations: [
		ContactViewComponent,
		// ContactFormComponent,
		ContactListViewComponent,
		ContactListTableComponent,
	],
	exports: [
		ContactViewComponent,
		ContactListViewComponent
	],
	imports: [
		CommonModule,
		CoreModule,
		SharedModule,
		ContactRoutingModule,
		StoreModule.forFeature('contactModule', contactModuleReducer),
		EffectsModule.forFeature([ContactModuleEffects])
	],
	providers: [
		ContactStoreService
	]
})
export class ContactModule { }
