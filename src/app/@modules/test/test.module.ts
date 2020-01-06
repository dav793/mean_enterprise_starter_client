import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../../@core/core.module';
import { SharedModule } from '../../@shared/shared.module';

import { FormInputsComponent } from './views/form-inputs/form-inputs.component';

@NgModule({
  declarations: [
    FormInputsComponent
  ],
  exports: [
    FormInputsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
  ]
})
export class TestModule { }
