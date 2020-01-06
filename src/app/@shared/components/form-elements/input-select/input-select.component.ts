import { Component, Input, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

import { IOptionType } from '../option-type';

@Component({
    selector: 'app-form-input-select',
    templateUrl: './input-select.component.html',
    styleUrls: ['./input-select.component.css']
})
export class InputSelectComponent implements OnInit {

    @Input() fGroup: FormGroup;
    @Input() fControlName: string;
	@Input() fArrayName: string;							// optional
	@Input() fArrayIndex: number;							// optional
    @Input() options: IOptionType[];
    @Input() multiple = false;                              // optional
    @Input() label = '';                                    // optional
    @Input() errorMessages: {[key: string]: string} = {};   // optional

    constructor() { }

    ngOnInit() { }

    get inputsReady(): boolean {
		if ( this.fGroup && this.fControlName ) {
			if (this.fArrayName || (this.fArrayIndex || this.fArrayIndex === 0)) {
				if (this.isFormArrayMember)
					return true;
				else
					return false;
			}
			else
				return true;
		}
		else
			return false;
    }

	get isFormArrayMember(): boolean {
		if (this.fArrayName && (this.fArrayIndex || this.fArrayIndex === 0))
			return true;
		return false;
	}

	getFormControl(): FormControl|null {
		if (this.fControlName && this.fGroup) {
			if (this.isFormArrayMember) {
				const arr = this.fGroup.controls[this.fArrayName] as FormArray;
				const group = arr.controls[this.fArrayIndex] as FormGroup;
				return group.controls[this.fControlName] as FormControl;
			}
			else
				return this.fGroup.controls[this.fControlName] as FormControl;
		}
		else
			return null;
	}

    get errorMessage(): string {
        const control = this.getFormControl();
        if (control && control.invalid) {
            const firstError = Object.keys(control.errors)[0];
            return this.errorMessages[firstError];
        }
        return '';
    }

}
