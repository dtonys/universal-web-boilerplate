import lodashGet from 'lodash/get';
import { put, call, fork, all } from 'redux-saga/effects';
import { takeOne } from 'redux/sagaHelpers';
import { redirect } from 'redux-first-router';

import {
  LOAD_USER_REQUESTED, LOAD_USER_STARTED, LOAD_USER_SUCCESS, LOAD_USER_ERROR,
  LOGOUT_REQUESTED, LOGOUT_SUCCESS,
  LOGIN_REQUESTED, LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_ERROR,
  SIGNUP_REQUESTED, SIGNUP_STARTED, SIGNUP_SUCCESS, SIGNUP_ERROR,
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
    const httpErrorMessage = lodashGet( httpError, 'error.message' );
    const errorMessage = httpErrorMessage || httpError.message;
    yield put({ type: LOAD_USER_ERROR, payload: errorMessage });
  }
}

function* logout(action, context) {
  yield call(context.request, '/api/logout');
  yield put({ type: LOGOUT_SUCCESS });
  yield put( redirect({ type: ROUTE_HOME }) );
}

function* login(action, context) {
  yield put({ type: LOGIN_STARTED });
  try {
    yield call( context.request, '/api/login', {
      method: 'POST',
      body: action.payload,
    });
    yield put({ type: LOGIN_SUCCESS });
    yield* loadUser(null, context);
    yield put( redirect({ type: ROUTE_HOME }) );
  }
  catch ( httpError ) {
    const httpErrorMessage = lodashGet( httpError, 'error.message' );
    const errorMessage = httpErrorMessage || httpError.message;
    yield put({ type: LOGIN_ERROR, payload: errorMessage });
  }
}

function* signup(action, context) {
  yield put({ type: SIGNUP_STARTED });
  try {
    yield call( context.request, '/api/signup', {
      method: 'POST',
      body: action.payload,
    });
    yield put({ type: SIGNUP_SUCCESS });
    yield* loadUser(null, context);
    yield put( redirect({ type: ROUTE_HOME }) );
  }
  catch ( httpError ) {
    const httpErrorMessage = lodashGet( httpError, 'error.message' );
    const errorMessage = httpErrorMessage || httpError.message;
    yield put({ type: SIGNUP_ERROR, payload: errorMessage });
  }
}


export default function* ( context ) {
  yield all([
    fork( takeOne( LOAD_USER_REQUESTED, loadUser, context ) ),
    fork( takeOne( LOGOUT_REQUESTED, logout, context ) ),
    fork( takeOne( LOGIN_REQUESTED, login, context ) ),
    fork( takeOne( SIGNUP_REQUESTED, signup, context ) ),
  ]);
}
