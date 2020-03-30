import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../lib/material/material.module';
import {TreeComponent} from './tree.component';

@NgModule({
	declarations: [
		TreeComponent
	],
	exports: [
		TreeComponent
	],
	imports: [
		CommonModule,
		MaterialModule
	]
})
export class TreeModule {
}
