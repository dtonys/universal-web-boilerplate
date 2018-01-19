import {
  fork,
  all,
} from 'redux-saga/effects';
import demoSaga from 'redux/demo/saga';
import userSaga from 'redux/user/saga';


export default function* rootSaga(context) {
  yield all([
    fork(demoSaga, context),
    fork(userSaga, context),
  ]);
}
