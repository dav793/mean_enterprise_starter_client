import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 *  only emits the values from source$ that are NOT any of the following:
 *    - falsey
 *    - empty object
 *
 *  usage:
 *    stateSlice$.pipe(
 *      excludeFalsy
 *    ).subscribe(...)
 */
export const excludeFalsy = (source$: Observable<any|null>): Observable<any> => {
  return source$.pipe(
    filter(v => {
      if (!v)
        return false;
      if (typeof v === 'object' && isEmptyObject(v))
        return false;
      return true;
    })
  );
};

function isEmptyObject(obj) {
  let empty = true;
  Object.keys(obj).forEach(key => {
    if (obj.hasOwnProperty(key))
      empty = false;
  });
  return empty;
}


