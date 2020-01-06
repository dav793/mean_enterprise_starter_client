import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * validates that value is a valid numeric value
 *
 * if parameter integerOnly == true, will return error when number not whole
 * @todo: implement this ^
 *
 * if value is not valid returns the following error object
 * {
 *    number: {
 *      value: any     // form control value
 *    }
 * }
 *
 * usage example:
 *
 *    const formGroup = formBuilder.group({
 *        example: [ '', [ numberValidator() ] ]
 *    });
 *
 */
export function numberValidator(integerOnly?: boolean): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {

        const error = { number: {value: control.value} };

        if (typeof control.value === 'number')
            return null;
        return error;

        if (control.value === 0)
          return null;
        return error;

    };
}
