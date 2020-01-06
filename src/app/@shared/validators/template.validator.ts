/**
 *  use these examples to get started writing your own validators
 */

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * synchronous validator function factory example
 *
 * expects control value === 'hello world', otherwise returns the following error object
 * {
 *    testSync: {
 *      value: any     // form control value
 *    }
 * }
 *
 * usage example:
 *
 *    const formGroup = formBuilder.group({
 *        example: [ '', [ testSyncValidator() ] ]
 *    });
 *
 */
export function testSyncValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {

        const error = { testSync: {value: control.value} };

        if (control.value === 'hello world')
            return null;
        return error;

    };
}

/**
 * asynchronous validator function factory example
 *
 * waits 1000 ms
 *
 * expects control value === 'hello world', otherwise emits the following error object
 * {
 *    testAsync: {
 *      value: any     // form control value
 *    }
 * }
 *
 * usage example:
 *
 *    const formGroup = formBuilder.group({
 *        example: [ '', [ ], [ testAsyncValidator() ] ]
 *    });
 *
 */
export function testAsyncValidator() {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

        const error = { testAsync: {value: control.value} };

        return timer(1000)
            .pipe(
                map(() => control.value !== 'hello world' ? error : null),
                catchError(() => null)
            );

    };
}
