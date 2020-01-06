import {AbstractControl, ValidatorFn} from "@angular/forms";

/**
 * validates that value is a valid regular-text string
 *
 * only allowed characters: letters, accented letters, spaces, hyphens, apostrophes
 *
 * if value is not valid returns the following error object
 * {
 *    regularText: {
 *      value: any     // form control value
 *    }
 * }
 *
 * usage example:
 *
 *    const formGroup = formBuilder.group({
 *        example: [ '', [ regularTextValidator() ] ]
 *    });
 *
 */
export function regularTextValidator(): ValidatorFn {
	return (control: AbstractControl): {[key: string]: any} | null => {

		const error = { regularText: {value: control.value} };

		if (control.value.match(/^[A-Za-zÀ-ÿ\s\-\']+$/) || control.value === '')
			return null;
		return error;

	};
}
