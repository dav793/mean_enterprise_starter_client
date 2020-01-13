import {
	Component,
	Input,
	Output,
	OnChanges,
	OnInit,
	OnDestroy,
	SimpleChanges,
	EventEmitter,
	ViewChild,
	ElementRef,
	AfterViewInit
} from '@angular/core';
import {FormControl, FormGroup, FormArray} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {combineLatest, EMPTY, merge, ReplaySubject, Subject} from 'rxjs';

import * as _ from 'lodash';

import {Format} from '../../../enums/format';

@Component({
  selector: 'app-form-input-money',
  templateUrl: './input-money.component.html',
  styleUrls: ['./input-money.component.css']
})
export class InputMoneyComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

    @Input() fGroup: FormGroup;
    @Input() fControlName: string;
    @Input() fArrayName: string;							// optional
	@Input() fArrayIndex: number;							// optional
    @Input() label = '';                                    // optional
    @Input() icon: string;                                  // optional
    @Input() multiple: boolean;                             // optional
    @Input() errorMessages: {[key: string]: string} = {};   // optional

	@Output() onSubmit = new EventEmitter<void>();

	@ViewChild('moneyInput') moneyInput: ElementRef;

	protected frontForm: FormGroup;
    protected multiTextForm: FormGroup;

	protected onInputsReady$ = new ReplaySubject<1>();
	protected onFrontFormReady$ = new ReplaySubject<1>();
	protected onSetupErrorReflection$ = new Subject();
    protected onReflectErrors$ = new Subject();
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
			console.warn('warning: multiple money input element is not yet fully implemented');

		if (this.inputsReady) {

			this.onInputsReady$.next();

			if (!this.multiple) {

				this.afterViewInit$.pipe(
					takeUntil(this.onDestroy$)
				).subscribe(() => {

					setTimeout(() => {  // wrapped in setTimout to avoid ExpressionChangedAfterItWasChecked error
						this.moneyInput.nativeElement.value = this.getFormControl().value;
					});

				});

			}

		}

    }

    ngOnDestroy() {
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

	buildFrontForm() {
		this.frontForm = new FormGroup({
			money: new FormControl('')
		});
		this.onFrontFormReady$.next();
	}

	setFrontFormInitialValue() {
		const backControl = this.getFormControl();
		const frontControl = this.frontForm.controls['money'];

		const backValue = backControl.value ? backControl.value.toString() : '';
		frontControl.setValue(backValue, { emitEvent: false });
	}

	// modify the back form control value whenever the front form control value changes
	watchFrontFormChanges() {

		const backControl = this.getFormControl();
		const frontControl = this.frontForm.controls['money'];

		frontControl.valueChanges
			.pipe( takeUntil(this.onDestroy$) )
			.subscribe(() => {

				let val = '';
				if (this.moneyInput)
					val = this.moneyInput.nativeElement.value;

				backControl.setValue(val, { emitEvent: true });
				backControl.markAsDirty();
				backControl.markAsTouched();
				backControl.updateValueAndValidity();

			});
	}

	onMoneyFrontFormSingleChange(event, inputText) {
		const backControl = this.getFormControl();
		const frontControl = this.frontForm.controls['money'];

		// backControl.setValue(frontControl.value ? frontControl.value.format(Format.DATE) : inputText, { emitEvent: true });
		backControl.setValue(frontControl.value ? frontControl.value : inputText, { emitEvent: true });
		backControl.markAsDirty();
		backControl.markAsTouched();
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
		const frontControl = this.frontForm ? this.frontForm.controls['money'] : null;

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

	_onSubmit() {
    	this.onSubmit.emit();
	}

}
