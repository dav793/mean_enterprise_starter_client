import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-form-input-password',
    templateUrl: './input-password.component.html',
    styleUrls: ['./input-password.component.css']
})
export class InputPasswordComponent implements OnInit {

    @Input() fGroup: FormGroup;
    @Input() fControl: FormControl;
    @Input() fControlName: string;
    @Input() label = '';                                    // optional
    @Input() errorMessages: {[key: string]: string} = {};   // optional

	@Output() onSubmit = new EventEmitter<void>();

    constructor() { }

    ngOnInit() { }

    getFormControl(): FormControl|null {
        if (this.fControl)
            return this.fControl;
        else if (this.fControlName && this.fGroup)
            return this.fGroup.controls[this.fControlName] as FormControl;
        else
            return null;
    }

    get inputsReady(): boolean {
        if ( this.fGroup && ( this.fControl || this.fControlName ) )
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

	_onSubmit() {
		this.onSubmit.emit();
	}

}
