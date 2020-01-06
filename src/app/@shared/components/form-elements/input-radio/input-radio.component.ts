import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-form-input-radio',
    templateUrl: './input-radio.component.html',
    styleUrls: ['./input-radio.component.css']
})
export class InputRadioComponent implements OnInit, OnChanges, OnDestroy {

    @Input() fGroup: FormGroup;
    @Input() fControlName: string;
	@Input() fArrayName: string;							// optional
	@Input() fArrayIndex: number;							// optional
    @Input() selectionValue;
    @Input() groupName;
    @Input() label = '';

    protected isChecked = false;
    protected onDestroy$ = new Subject<void>();

    constructor() { }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.onDestroy$.next();
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (this.inputsReady) {
            const control = this.getFormControl();
            if (!control)
                return;

            this.updateButtonState(control.value);
            this.listenFormChanges();
        }

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

    onBtnSelect() {
        const control = this.getFormControl();
        if (!control)
            return;

        control.setValue(this.selectionValue, {emitEvent: true});
        control.markAsDirty();
        control.markAsTouched();
    }

    listenFormChanges() {
        const control = this.getFormControl();
        if (!control)
          return;

        control.valueChanges.pipe(
            takeUntil(this.onDestroy$)
        ).subscribe(newValue => this.updateButtonState(newValue));
    }

    updateButtonState(newValue: any) {
        if (newValue === this.selectionValue)
            this.isChecked = true;
        else
            this.isChecked = false;
    }

}
