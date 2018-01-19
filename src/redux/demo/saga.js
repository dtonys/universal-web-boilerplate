import { put, call, fork, all } from 'redux-saga/effects';
import { delay, takeOne } from 'redux/sagaHelpers';
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  INCREMENT_COUNTER_ASYNC,
  DECREMENT_COUNTER_ASYNC,
  LOAD_DATA_REQUESTED,
  LOAD_DATA_STARTED,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
} from 'redux/demo/actions';


function* incrementCounterAsync(/* ...args */) {
  yield call(delay(1000));
  yield put({ type: INCREMENT_COUNTER });
}

function* decrementCounterAsync(/* ...args */) {
  yield call(delay(1000));
  yield put({ type: DECREMENT_COUNTER });
}

function* loadData(action, context) {
  yield put({ type: LOAD_DATA_STARTED });
  try {
    const posts = yield call(
      context.request,
      'https://jsonplaceholder.typicode.com/posts',
      { query: { _limit: 5 } },
    );
    yield put({ type: LOAD_DATA_SUCCESS, payload: posts });
  }
  catch ( httpError ) {
    const errorMessage = httpError.error ? httpError.error : httpError.message;
    yield put({ type: LOAD_DATA_ERROR, payload: errorMessage });
  }
}

export default function* ( context ) {
  yield all([
    fork( takeOne(INCREMENT_COUNTER_ASYNC, incrementCounterAsync, context) ),
    fork( takeOne(DECREMENT_COUNTER_ASYNC, decrementCounterAsync, context) ),
    fork( takeOne(LOAD_DATA_REQUESTED, loadData, context) ),
  ]);
}
