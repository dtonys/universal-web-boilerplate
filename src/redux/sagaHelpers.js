import {
  take,
} from 'redux-saga/effects';


export function delay( ms ) {
  return () => (
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    })
  );
}

export function takeOne( actionType, fn, ...args ) {
  return function* () { // eslint-disable-line func-names
    while (true) { // eslint-disable-line no-constant-condition
      const action = yield take(actionType);
      yield* fn(action, ...args);
    }
  };
}

export const obj = {};
