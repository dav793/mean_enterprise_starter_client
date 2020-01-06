import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

	loginForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<LoginDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: LoginDialogData,
		private formBuilder: FormBuilder
    ) { }

    login(): void {
        this.dialogRef.close(this.loginForm ? this.loginForm.value : null);
    }

	ngOnInit() {
		this.loginForm = this.buildForm();
	}

	buildForm(): FormGroup {
		const group = this.formBuilder.group({
			password: ['', Validators.required]
		});

		return group;
	}

	// getter for the form values
	get values() {
		return this.loginForm.controls;
	}

}

export interface LoginDialogData {
    title: string;
}
