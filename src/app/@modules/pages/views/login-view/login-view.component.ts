import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserSessionService } from '../../../../@core/user/user-session.service';

import { first } from 'rxjs/operators';

@Component({
    selector: 'app-login-view',
    templateUrl: './login-view.component.html',
    styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    errorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private loginService: UserSessionService
    ) { }

    ngOnInit() {
        this.loginForm = this.buildForm();
    }


    buildForm(): FormGroup {
        const group = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        return group;
    }

    // getter for the form values
    get values() {
        return this.loginForm.controls;
    }

    login(): void {

        if (this.loginForm.invalid)
          	return;

        this.loading = true;
        this.loginService.login(this.values.username.value, this.values.password.value)
	  		.pipe(first())
			.subscribe(
				() => this.router.navigate(['/users']),
				error => {
					if (error.status === 401)
						this.errorMessage = 'Incorrect username or password.';
					else
						this.errorMessage = 'Error with server communication.';

					this.loading = false;
				}
			);

    }

}
