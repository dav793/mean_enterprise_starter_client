import { Component, Input, OnInit, OnDestroy, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import { Subject, ReplaySubject } from 'rxjs';

import { IOptionType } from '../option-type';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form-input-select-search',
  templateUrl: './input-select-search.component.html',
  styleUrls: ['./input-select-search.component.css']
})
export class InputSelectSearchComponent implements OnInit, OnDestroy, OnChanges {

    @Input() fGroup: FormGroup;
    @Input() fControl: FormControl;
    @Input() fControlName: string;
	@Input() fArrayName: string;							// optional
	@Input() fArrayIndex: number;							// optional
    @Input() options: IOptionType[];
    @Input() multiple = false;                              // optional
    @Input() label = '';                                    // optional
    @Input() errorMessages: {[key: string]: string} = {};   // optional

    filterControl: FormControl = new FormControl('');
    filteredOptions$: ReplaySubject<IOptionType[]> = new ReplaySubject(1);

    protected onDestroy$ = new Subject<void>();

    constructor() { }

    ngOnInit() { }

    ngOnDestroy() {
        this.onDestroy$.next();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.inputsReady)
            this.init();
    }

    init() {

        // load the initial option list
        this.filteredOptions$.next(this.options.slice());

        // listen for search text changes
        this.filterControl.valueChanges
            .pipe( takeUntil(this.onDestroy$) )
            .subscribe(() => this.filterOptions());

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

    get errorMessage(): string {
        const control = this.getFormControl();
        if (control && control.invalid) {
            const firstError = Object.keys(control.errors)[0];
            return this.errorMessages[firstError];
        }
        return '';
    }

    protected filterOptions() {

        if (!this.options)
            return;

        let searchText = this.filterControl.value;
        if (!searchText) {
            this.filteredOptions$.next(this.options.slice());
            return;
        }
        else {
            searchText = searchText.toLowerCase();
        }

        // filter the options
        this.filteredOptions$.next(
            this.options.filter(o => o.label.toLowerCase().indexOf(searchText) > -1)
        );

    }

}
