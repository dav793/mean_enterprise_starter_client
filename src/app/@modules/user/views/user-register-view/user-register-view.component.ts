import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, first, takeUntil } from 'rxjs/operators';

import { IUserRegisterBody } from '../../../../@core/user/user-api.service';
import { CoreStoreService } from '../../../../@core/store/core-store';
import { UserStoreService } from '../../store/user-store';

import { validatePasswords } from './confirm-password.validator';
import { regularTextValidator } from '../../../../@shared/validators/regular-text.validator';
import { ToasterService } from '../../../../@shared/lib/ngx-toastr/toaster.service';

@Component({
	selector: 'app-user-register-view',
	templateUrl: './user-register-view.component.html',
	styleUrls: ['./user-register-view.component.scss']
})
export class UserRegisterViewComponent implements OnInit, OnDestroy {

	registerForm: FormGroup;
	passwordForm: FormGroup;

	errorMessages = {
		firstName: {
			required: 'Campo obligatorio',
			maxlength: 'No debe exceder 30 caracteres',
			regularText: 'Caracteres inválidos'
		},
		lastName: {
			required: 'Campo obligatorio',
			maxlength: 'No debe exceder 30 caracteres',
			regularText: 'Caracteres inválidos'
		},
		secondLastName: {
			required: 'Campo obligatorio',
			maxlength: 'No debe exceder 30 caracteres',
			regularText: 'Caracteres inválidos'
		},
		username: {
			required: 'Campo obligatorio',
			maxlength: 'No debe exceder 30 caracteres'
		},
		email: {
			required: 'Campo obligatorio',
			email: 'No es una dirección de correo válida',
			maxlength: 'No debe exceder 50 caracteres'
		},
		password: {
			required: 'Campo obligatorio',
			minlength: 'Debe ser al menos 6 caracteres',
			maxlength: 'No debe exceder 20 caracteres'
		},
		passwordConfirm: {
			required: 'Campo obligatorio',
			passwordDoesNotMatch: 'Contraseñas no coinciden'
		}
	};

	protected onDestroy$ = new Subject<void>();

	constructor(
		private formBuilder: FormBuilder,
		private storeService: CoreStoreService,
		private userStore: UserStoreService,
		private toaster: ToasterService,
		private router: Router
	) { }

	ngOnInit() {
		this.registerForm = this.buildForm();
		this.passwordForm = this.buildPasswordForm();
	}

	ngOnDestroy() {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}

	buildForm(): FormGroup {
		const group = this.formBuilder.group({
			firstName:        [ '', [Validators.required, Validators.maxLength(30), regularTextValidator()] ],
			lastName:         [ '', [Validators.required, Validators.maxLength(30), regularTextValidator()] ],
			secondLastName:   [ '', [Validators.maxLength(30), regularTextValidator()] ],
			username:         [ '', [Validators.required, Validators.maxLength(30)] ],
			email:            [ '', [Validators.required, Validators.email, Validators.maxLength(50)] ]
		});
		return group;
	}

	buildPasswordForm(): FormGroup {
		const group = this.formBuilder.group({
			password:         [ '', [Validators.required, Validators.minLength(6), Validators.maxLength(20)] ],
			passwordConfirm:  [ '', [] ]
		});

		group.controls.passwordConfirm.setValidators(
			[Validators.required, validatePasswords(group)]
		);

		// update 'passwordConfirm' validators when 'password' is changed
		group.controls.password.valueChanges.pipe(
			takeUntil(this.onDestroy$)
		).subscribe(() => group.controls.passwordConfirm.updateValueAndValidity());

		return group;
	}

	register() {
		if (!this.registerForm.valid || !this.passwordForm.valid)
			return;

		const password = this.passwordForm.controls.password.value;
		const user: IUserRegisterBody = { ...this.registerForm.value, password };

		const actionMetadata = this.storeService.registerUser(user);

		// si servidor responde con exito
		this.userStore.selectUserSaveSuccessEventId().pipe(
			filter(eventId => eventId === actionMetadata.eventId),
			first()
		).subscribe(() => {
			this.toaster.showSuccess('Usuario creado', 'Exito');
			this.router.navigate(['/login']);
		});

		// si servidor responde con error
		this.userStore.selectUserSaveErrorEventId().pipe(
			filter(eventId => eventId === actionMetadata.eventId),
			first()
		).subscribe(() => {
			console.error('error creating user');
		});
	}

	get formsAreValid(): boolean {
		if (!this.registerForm || !this.passwordForm)
			return false;
		return this.registerForm.valid && this.passwordForm.valid;
	}

}
