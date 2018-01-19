import lodashGet from 'lodash/get';
import { put, call, fork, all } from 'redux-saga/effects';
import { takeOne } from 'redux/sagaHelpers';
import { redirect } from 'redux-first-router';

import {
  LOAD_USER_REQUESTED, LOAD_USER_STARTED, LOAD_USER_SUCCESS, LOAD_USER_ERROR,
  LOGOUT_REQUESTED, LOGOUT_SUCCESS,
} from './actions';
import {
  ROUTE_HOME,
} from 'routesMap';


function* loadUser(action, context) {
  yield put({ type: LOAD_USER_STARTED });
  try {
    const userData = yield call(context.request, '/api/session');
    const userPayload = lodashGet(userData, 'data.currentUser', null);
    yield put({ type: LOAD_USER_SUCCESS, payload: userPayload });
  }
  catch ( httpError ) {
    const errorMessage = httpError.error ? httpError.error : httpError.message;
    yield put({ type: LOAD_USER_ERROR, payload: errorMessage });
  }
}

function* logout(action, context) {
  yield call(context.request, '/api/logout');
  yield put({ type: LOGOUT_SUCCESS });
  yield put( redirect({ type: ROUTE_HOME }) );
}

export default function* ( context ) {
  yield all([
    fork( takeOne( LOAD_USER_REQUESTED, loadUser, context ) ),
    fork( takeOne( LOGOUT_REQUESTED, logout, context ) ),
  ]);
}
