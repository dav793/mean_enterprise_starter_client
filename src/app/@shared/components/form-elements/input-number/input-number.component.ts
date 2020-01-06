import {Component, Input, OnChanges, OnInit, OnDestroy, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {combineLatest, merge, ReplaySubject, Subject} from 'rxjs';

import Utils from '../../../helpers/utils/utils';
import * as _ from 'lodash';

@Component({
  selector: 'app-form-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css']
})
export class InputNumberComponent implements OnInit, OnChanges, OnDestroy {

    @Input() fGroup: FormGroup;
    @Input() fControl: FormControl;
    @Input() fControlName: string;
    @Input() label = '';                                    // optional
    @Input() errorMessages: {[key: string]: string} = {};   // optional
    @Input() integerOnly: boolean;                          // optional
    @Input() nonNegativeOnly: boolean;                      // optional

    protected frontForm: FormGroup;

    protected onInputsReady$ = new ReplaySubject<1>();
    protected onFrontFormReady$ = new ReplaySubject<1>();
    protected onSetupErrorReflection$ = new Subject();
    protected onDestroy$ = new Subject();

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

    ngOnChanges(changes: SimpleChanges) {
        if ( changes.fControlName || changes.fControl || changes.fGroup ) {
            if (this.inputsReady)
                this.onInputsReady$.next();
        }
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    buildFrontForm() {
        this.frontForm = new FormGroup({
            text: new FormControl('')
        });
        this.onFrontFormReady$.next();
    }

    setFrontFormInitialValue() {
        const backControl = this.getFormControl();
        const frontControl = this.frontForm.controls['text'];

        frontControl.setValue(backControl.value.toString(), { emitEvent: false });
    }

    // modify the back form control value whenever the front form control value changes
    watchFrontFormChanges() {

        const backControl = this.getFormControl();
        const frontControl = this.frontForm.controls['text'];

        frontControl.valueChanges
            .pipe( takeUntil(this.onDestroy$) )
            .subscribe(() => {

                let val = frontControl.value.trim();
                if (Utils.isNumeric(val))
                    val = this.integerOnly ? parseInt(val, 10) : parseFloat(val);

                if (this.nonNegativeOnly && val < 0)
                    val *= -1;

                backControl.setValue(val, { emitEvent: true });
                backControl.markAsDirty();
                backControl.markAsTouched();
                backControl.updateValueAndValidity();

            });
    }

    get inputsReady(): boolean {
        if ( this.fGroup && ( this.fControl || this.fControlName ) )
            return true;
        return false;
    }

    getFormControl(): FormControl|null {
        if (this.fControl)
            return this.fControl;
        else if (this.fControlName && this.fGroup)
            return this.fGroup.controls[this.fControlName] as FormControl;
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

    // mirror the errors of back form control to the front form control
    reflectErrors() {

        const backControl = this.getFormControl();
        const frontControl = this.frontForm ? this.frontForm.controls['text'] : null;

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

}
