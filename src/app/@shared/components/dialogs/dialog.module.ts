import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../lib/material/material.module';
import { FormElementsModule } from '../form-elements/form-elements.module';

import { DialogService } from '../../services/dialog.service';

import { YesNoDialogComponent } from './yes-no-dialog/yes-no-dialog.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@NgModule({
	declarations: [
		YesNoDialogComponent,
		LoginDialogComponent
	],
	exports: [
		YesNoDialogComponent,
		LoginDialogComponent
	],
	entryComponents: [
		YesNoDialogComponent,
		LoginDialogComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		FormElementsModule
	]
})
export class DialogModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: DialogModule,
			providers: [
				DialogService
			]
		};
	}
}
