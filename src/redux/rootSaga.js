import {
  fork,
  all,
} from 'redux-saga/effects';
import counterSaga from 'redux/counter/saga';


export default function* rootSaga(context) {
  yield all([
    fork(counterSaga, context),
  ]);
}
