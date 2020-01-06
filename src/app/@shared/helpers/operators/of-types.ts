import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

/**
 * pipeable operator
 *
 * lets through any ngrx action whose type matches any element in the provided list of action type strings.
 *
 * usage:
 *    actions$.pipe(
 *      ofTypes([
 *          UsersActions.ActionTypes.APICreateUserError,
 *          UsersActions.ActionTypes.APIUpdateUserError,
 *          UsersActions.ActionTypes.APIDeleteUserError
 *      ])
 *    ).subscribe(...)
 *
 * @param actionTypes list of action types to be matched
 */
export function ofTypes(actionTypes: string[]) {
  return (source$: Observable<Action>) => new Observable<Action>(subscriber => {
    return source$.subscribe(
      a => {
          const matchingTypes = actionTypes.filter(type => type === a.type);
          if (matchingTypes && matchingTypes.length > 0)
            subscriber.next(a);
      },
      e => subscriber.error(e),
      () => subscriber.complete()
    );
  });
}
