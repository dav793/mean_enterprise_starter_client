import {EMPTY, Observable} from 'rxjs';
import {catchError, filter} from 'rxjs/operators';

/**
 * this is just a higher order function that wraps around the filter operator
 */
export function takeEveryNth(n: number) {
  return filter((i: number) => i % n === 0);
}

/**
 * this is just a higher order function that wraps around the catchError operator
 */
export function logError() {
  return catchError(e => {
    console.error(e);
    return EMPTY;
  });
}

/**
 * this is a custom implementation of the map operator
 *
 * it's a function that takes another function (called the 'projection' or 'transformation' function)
 * and returns a pipeable operator, which is a function that takes a source observable
 * and returns another observable, which when subscribed to, subscribes to the source observable as well
 *
 * @param fn transformation function. transforms values of type T into values of type R.
 */
export function customMap<T, R>(fn: (value: T) => R) {
  return (source$: Observable<T>) => new Observable<R>(subscriber => {
    return source$.subscribe(
      v => subscriber.next(fn(v)),
      e => subscriber.error(e),
      () => subscriber.complete()
    );
  });
}
