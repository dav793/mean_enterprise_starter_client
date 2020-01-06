import {Component, Input, Output, OnChanges, OnInit, OnDestroy, SimpleChanges, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, FormArray} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {EMPTY, merge, Subject} from 'rxjs';

import * as _ from 'lodash';

@Component({
  selector: 'app-form-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit, OnChanges, OnDestroy {

    @Input() fGroup: FormGroup;
    @Input() fControlName: string;
    @Input() fArrayName: string;							// optional
	@Input() fArrayIndex: number;							// optional
    @Input() label = '';                                    // optional
    @Input() icon: string;                                  // optional
    @Input() multiple: boolean;                             // optional
    @Input() errorMessages: {[key: string]: string} = {};   // optional

	@Output() onSubmit = new EventEmitter<void>();

    protected multiTextForm: FormGroup;
    protected onReflectErrors$ = new Subject();
    protected onDestroy$ = new Subject();

    constructor() { }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.multiple && this.multiple) {
            this.multiTextForm = new FormGroup({
                multiText: new FormControl('')
            });
        }

        if (changes.fControlName)
            this.reflectErrors();
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
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

    onMultiFormSubmit() {
        const newValue = this.multiTextForm.controls['multiText'].value.trim();
        if (newValue === '')
            return;

        const control = this.getFormControl();
        const result = [...control.value].concat([newValue]);
        this.multiTextForm.controls['multiText'].setValue('');

        control.setValue(result, { emitEvent: true });
        control.markAsDirty();
        control.markAsTouched();
    }

    onChipRemove(index: number) {
        const control = this.getFormControl();
        if (control.value.length <= index)
            return;

        const newValue = [...control.value];
        newValue.splice(index, 1);

        control.setValue(newValue, { emitEvent: true });
        control.markAsDirty();
        control.markAsTouched();
    }

    get errorMessage(): string {
        const control = this.getFormControl();
        if (control && control.invalid) {
            const firstError = Object.keys(control.errors)[0];
            return this.errorMessages[firstError];
        }
        return '';
    }

    reflectErrors() {

        const backControl = this.getFormControl();
        const frontControl = this.multiple && this.multiTextForm ? this.multiTextForm.controls['multiText'] : null;

        if (frontControl) {

            this.onReflectErrors$.next();   // unsubscribe from last one

            merge(
                backControl.statusChanges,
                frontControl.valueChanges
            ).pipe(
                takeUntil(this.onDestroy$),
                takeUntil(this.onReflectErrors$)
            ).subscribe(() => {

                const currentErrors = frontControl.errors;
                const newErrors = backControl.errors;
                if ( !_.isEqual(currentErrors, newErrors) )
                    frontControl.setErrors(backControl.errors, {emitEvent: true});

            });

        }

    }

	_onSubmit() {
    	this.onSubmit.emit();
	}

}
