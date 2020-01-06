# Custom Operators
This is a guide to writing your own operators for use in RxJS pipe functions.

Writing custom operators can increase the readability, reusability, and testability of our apps, so it is encouraged.

Before we can understand how to write our own operators, first we need to understand a couple of concepts.

## What is an operator?
It's just a function that takes an observable and returns another observable.
```
(Observable<A>) => Observable<B>
```

## What is a higher order function?
It's just a function that takes other functions as parameters, returns a function, or both.

These are all examples of higher order functions:
```
  (a: function) => any
```
```
  () => function
```
```
  (a: function, b: function) => function
```

## How to write custom operators?
Just like any operator, your custom operators are also functions that take a source observable, and return another observable. When the returned observable is subscribed to, it subscribes to the source observable as well. This is what lets us chain operators.

You can write your own operators from preexisting operators or create them from scratch.

### From preexisting operators

Example: Error logger
```typescript
function logError() {
  return catchError(e => {      // catchError is a pipeable operator, so this works
    console.error(e);
    return EMPTY;
  });
}
```

### From scratch
The important thing to remember here is that the **returned observable must always subscribe to the source observable**.

Example: Custom map operator
```typescript
function customMap<T, R>(fn: (value: T) => R) {
  return (source$: Observable<T>) => new Observable<R>(subscriber => {
    return source$.subscribe(            // the returned observable must always subscribe to source observable
      v => subscriber.next(fn(v)),       // transform each value from source$ and 'next' it into the returned observable
      e => subscriber.error(e),          // don't forget to handle errors
      () => subscriber.complete()
    );
  });
}
```
