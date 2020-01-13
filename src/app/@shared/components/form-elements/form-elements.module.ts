import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../lib/material/material.module';

import { InputTextComponent } from './input-text/input-text.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { InputSelectSearchComponent } from './input-select-search/input-select-search.component';
import { InputDateComponent } from './input-date/input-date.component';
import { InputCheckComponent } from './input-check/input-check.component';
import { InputRadioComponent } from './input-radio/input-radio.component';
import { InputToggleComponent } from './input-toggle/input-toggle.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputMoneyComponent } from './input-money/input-money.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
        InputTextComponent,
        InputSelectComponent,
        InputSelectSearchComponent,
        InputDateComponent,
        InputPasswordComponent,
        InputCheckComponent,
        InputToggleComponent,
        InputRadioComponent,
        InputNumberComponent,
		InputMoneyComponent
    ],
    exports: [
        InputTextComponent,
        InputSelectComponent,
        InputSelectSearchComponent,
        InputDateComponent,
        InputPasswordComponent,
        InputCheckComponent,
        InputToggleComponent,
        InputRadioComponent,
        InputNumberComponent,
		InputMoneyComponent
    ]
})
export class FormElementsModule { }
