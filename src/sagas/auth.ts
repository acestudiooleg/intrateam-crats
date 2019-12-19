import { call, put, take } from 'redux-saga/effects';
import authActions, { LOGIN, LOGOUT } from '../actions/auth';
import { push } from 'connected-react-router';

import { setItem, getItem, removeItem } from '../utils/localStorage';
import userActions from '../actions/user';
import { Routes } from '../constants';

interface ILoginAction {
  type: string;
  payload: {
    email: string;
    password: string;
  };
}

export const verifyToken = (token: string) => token === '2+2=4';

const signIn = (email: string, password: string) => {
  console.log({ email, password });
  return '2+2=4';
};

const getUserByToken = (token: string) => {
  console.log({ token });
  return {
    email: 'e@mail.com',
    name: 'Dart',
    lastname: 'Waider',
  };
};

export function* authorize(token: string) {
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
  yield unauthorize();
  window.location.pathname = Routes.Login;
}

export function* login() {
  for (;;) {
    const {
      payload: { email, password },
    } = yield take(LOGIN);
    try {
      yield put({ type: 'LOADING_START' });
      const idToken = yield call(signIn, email, password);
      yield call(authorize, idToken);
      yield put({ type: 'LOADING_STOP' });
      yield put(push(Routes.Dashboard));
      yield call(logout);
    } catch (err) {
      console.log({ err });
      yield put({ type: 'LOADING_STOP' });
    }
  }
}

export default function* auth() {
  const idToken = yield call(getItem, 'idToken');
  try {
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
    console.log(err);
  } finally {
    yield call(login);
  }
}
