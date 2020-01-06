import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';

import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ReplaySubject, Subject, merge, combineLatest} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Format } from '../../../enums/format';

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
    selector: 'app-form-input-date',
    templateUrl: './input-date.component.html',
    styleUrls: ['./input-date.component.css']
})
export class InputDateComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

    @Input() fGroup: FormGroup;
    @Input() fControlName: string;
	@Input() fArrayName: string;							// optional
	@Input() fArrayIndex: number;							// optional
    @Input() label = '';
    @Input() multiple: boolean;                             // optional
    @Input() errorMessages: {[key: string]: string} = {};   // optional

    @ViewChild('pickerInput') pickerInput: ElementRef;
    @ViewChild('pickerInputMulti') pickerInputMulti: ElementRef;

    protected frontForm: FormGroup;

    protected onInputsReady$ = new ReplaySubject<1>();
    protected onFrontFormReady$ = new ReplaySubject<1>();
    protected onSetupErrorReflection$ = new Subject();
    protected onDestroy$ = new Subject();
    protected afterViewInit$ = new Subject();

    constructor() { }

    ngOnInit() {
        this.buildFrontForm();
        this.setFrontFormInitialValue();

        combineLatest(
            this.onInputsReady$,
            this.onFrontFormReady$
        ).subscribe(() => {
            this.watchFrontFormChanges();
            this.reflectErrors();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (this.multiple)
            console.warn('warning: multiple date input element is not yet fully implemented');

        if (this.inputsReady) {

            this.onInputsReady$.next();

            if (!this.multiple) {

                this.afterViewInit$.pipe(
                    takeUntil(this.onDestroy$)
                ).subscribe(() => {

                    setTimeout(() => {  // wrapped in setTimout to avoid ExpressionChangedAfterItWasChecked error
                        this.pickerInput.nativeElement.value = this.getFormControl().value;
                    });

                });

            }

        }

    }

    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    ngAfterViewInit() {
        this.afterViewInit$.next();
        this.afterViewInit$.complete();
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

	get isFormArrayMember(): boolean {
		if (this.fArrayName && (this.fArrayIndex || this.fArrayIndex === 0))
			return true;
		return false;
	}

    buildFrontForm() {
        this.frontForm = new FormGroup({
            date: new FormControl('')
        });
        this.onFrontFormReady$.next();
    }

    setFrontFormInitialValue() {
        const backControl = this.getFormControl();
        const frontControl = this.frontForm.controls['date'];

        const backValue = backControl.value ? backControl.value.toString() : '';
        frontControl.setValue(backValue, { emitEvent: false });
    }

    // modify the back form control value whenever the front form control value changes
    watchFrontFormChanges() {

        const backControl = this.getFormControl();
        const frontControl = this.frontForm.controls['date'];

        frontControl.valueChanges
            .pipe( takeUntil(this.onDestroy$) )
            .subscribe(() => {

                let val = '';
                if (this.pickerInput)
                    val = this.pickerInput.nativeElement.value;

                backControl.setValue(val, { emitEvent: true });
                backControl.markAsDirty();
                backControl.markAsTouched();
                backControl.updateValueAndValidity();

            });
    }

    // mirror the errors of back form control to the front form control
    reflectErrors() {

        const backControl = this.getFormControl();
        const frontControl = this.frontForm ? this.frontForm.controls['date'] : null;

        if (frontControl) {

            this.onSetupErrorReflection$.next();   // unsubscribe from last one

            merge(
                backControl.statusChanges,
                backControl.valueChanges
            ).pipe(
                takeUntil(this.onDestroy$),
                takeUntil(this.onSetupErrorReflection$)
            ).subscribe(() => {

                if ( !_.isEqual(frontControl.errors, backControl.errors) )
                    frontControl.setErrors(backControl.errors, {emitEvent: true});

            });

        }

    }

    onDateFrontFormSingleChange(event, inputText) {
        const backControl = this.getFormControl();
        const frontControl = this.frontForm.controls['date'];

        backControl.setValue(frontControl.value ? frontControl.value.format(Format.DATE) : inputText, { emitEvent: true });
        backControl.markAsDirty();
        backControl.markAsTouched();
    }

    onDateSingleChange(event, inputText) {
        const backControl = this.getFormControl();
        const frontControl = this.frontForm.controls['date'];

        backControl.setValue(frontControl.value ? frontControl.value.format(Format.DATE) : inputText, { emitEvent: true });
        backControl.markAsDirty();
        backControl.markAsTouched();
    }

    onDateMultiChange(event, inputText) {
        const newValue = event.value === null ? '' : event.value;
        const control = this.getFormControl();
        const result = [...control.value].concat([newValue]);

        control.setValue(result, { emitEvent: true });
        control.markAsDirty();
        control.markAsTouched();

        if (this.pickerInputMulti)
            this.pickerInputMulti.nativeElement.value = '';
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

}
