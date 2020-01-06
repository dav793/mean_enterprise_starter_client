import { AbstractControl, ValidatorFn } from '@angular/forms';

import { Format } from '../enums/format';

import * as moment from 'moment';

/**
 * validates that value is a valid date in the format 'D/M/YYYY'
 *
 * if value is not valid returns the following error object
 * {
 *    date: {
 *      value: any     // form control value
 *    }
 * }
 *
 * usage example:
 *
 *    const formGroup = formBuilder.group({
 *        example: [ '', [ dateValidator() ] ]
 *    });
 *
 */
export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {

    const error = { date: {value: control.value} };

    if (control.value === '')
        return null;

    if (typeof control.value !== 'string')
        return error;

    const date = moment(control.value, Format.DATE);

    if (date.isValid())
      return null;
    return error;

  };
}
