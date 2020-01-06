import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

export function validatePasswords(group: FormGroup): ValidatorFn {
	return (control: AbstractControl): {[key: string]: any} | null => {

		const error = { passwordDoesNotMatch: true };

		if (!group || !group.controls.password || !group.controls.passwordConfirm)
			return error;

		const pass = group.controls.password.value;
		const confirmPass = group.controls.passwordConfirm.value;

		return pass === confirmPass ? null : error;

	};
}
