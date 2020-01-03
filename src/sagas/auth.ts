import { call, put, take, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import authActions, { LOGIN, LOGOUT } from '../actions/auth';

import { setItem, getItem, removeItem } from '../utils/localStorage';
import userActions from '../actions/user';
import { Routes } from '../constants';
import { IUser } from '../reducers/user';
import { getAuth } from '../reducers/auth';
import { SagaIterator } from 'redux-saga';

export const verifyToken = (token: string): boolean => token === '2+2=4';

export const signIn = (email: string, password: string): string => {
  console.log({ email, password });
  return '2+2=4';
};

export const getUserByToken = (token: string): IUser => {
  console.log({ token });
  return {
    email: 'e@mail.com',
    name: 'Dart',
    lastname: 'Waider',
  };
};

export function* authorize(t: string): SagaIterator {
  let token = t;
  if (token) {
    yield call(setItem, 'idToken', token);
  } else {
    token = yield call(getItem, 'idToken');
  }
  const user = yield call(getUserByToken, token);
  yield put(userActions.setUser(user));
  yield put(authActions.authorize({ token }));
}

export function* unauthorize() {
  yield put(authActions.unauthorize());
  yield call(removeItem, 'idToken');
}

export function* logout() {
  yield take(LOGOUT);
  yield call(unauthorize);
  window.location.pathname = Routes.Login;
}

export function* login(): SagaIterator {
  for (;;) {
    yield take(LOGIN);
    try {
      const {
        authPair: { email, password },
      } = yield select(getAuth);
      yield put({ type: 'LOADING_START' });
      const idToken = yield call(signIn, email, password);
      yield call(authorize, idToken);
      yield put({ type: 'LOADING_STOP' });
      yield put(push(Routes.Dashboard));
      yield call(logout);
    } catch (err) {
      yield call(console.log, err);
      yield put({ type: 'LOADING_STOP' });
    }
  }
}

export default function* auth(): SagaIterator {
  try {
    const idToken = yield call(getItem, 'idToken');
    if (idToken) {
      const isValid = yield call(verifyToken, idToken);
      if (isValid) {
        yield call(authorize, idToken);
        yield call(logout);
      } else {
        yield call(unauthorize);
      }
    }
  } catch (err) {
    yield call(console.log, err);
  } finally {
    yield call(login);
  }
}
