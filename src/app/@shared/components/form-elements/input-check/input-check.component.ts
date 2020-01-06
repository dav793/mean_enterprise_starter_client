import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-form-input-check',
    templateUrl: './input-check.component.html',
    styleUrls: ['./input-check.component.css']
})
export class InputCheckComponent implements OnInit {

    @Input() fGroup: FormGroup;
    @Input() fControlName: string;
	@Input() fArrayName: string;							// optional
	@Input() fArrayIndex: number;							// optional
    @Input() label = '';

    constructor() { }

    ngOnInit() {
    }

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

}
