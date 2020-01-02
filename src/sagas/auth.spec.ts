import { call, take, put } from 'redux-saga/effects';
import { saga, does, ends, throws, selects } from '../utils/saga';
import { getItem, setItem, removeItem } from '../utils/localStorage';
import { push } from 'connected-react-router';
import authSaga, { verifyToken, authorize, logout, login, signIn, getUserByToken, unauthorize } from './auth';
import authActions, { LOGIN, LOGOUT } from '../actions/auth';
import userActions from '../actions/user';
import { Routes } from '../constants';

const token = '123';
const email = 'email';
const password = 'password';
const authPair = { email, password };
const auth = { authPair };
const store = { auth };

const authorizePartFlow = [
  does('should get token from localstorage', call(getItem, 'idToken')),
  does('should verify token - in case when token is valid', call(verifyToken, token), token),
];

describe(
  'Authorize when token exists',
  saga(authSaga, [
    ...authorizePartFlow,
    does('should call authorize flow', call(authorize, token), token),
    does('should call logout flow', call(logout)),
    does('should call login flow', call(login)),
    ends(),
  ]),
);

describe(
  'Authorize when token is not valid',
  saga(authSaga, [
    ...authorizePartFlow,
    does('should call authorize flow', call(unauthorize)),
    does('should call login flow', call(login)),
    ends(),
  ]),
);

describe(
  'Authorize when token does not exists',
  saga(authSaga, [
    does('should get token from localstorage', call(getItem, 'idToken')),
    does('should call logout flow', call(login)),
    ends(),
  ]),
);

describe(
  'Authorize catch error',
  saga(authSaga, [
    does('should get token from localstorage', call(getItem, 'idToken')),
    throws(does('should throw error on get token from localstorage', call(console.log, 'hello'), 'hello')),
  ]),
);

describe(
  'Login flow',
  saga(login, [
    does('should wait for login action', take(LOGIN)),
    selects('should select email and pass from storage', auth, store),
    does('should start loader', put({ type: 'LOADING_START' }), auth),
    does('should signin', call(signIn, authPair.email, authPair.password), auth),
    does('should call authorize flow', call(authorize, token), token),
    does('should stop loader', put({ type: 'LOADING_STOP' }), auth),
    does('should redirect to Dashboard', put(push(Routes.Dashboard)), auth),
    does('should call logout flow', call(logout)),
    does('should wait for login action', take(LOGIN)),
  ]),
);

describe(
  'Login flow should catch error',
  saga(login, [
    does('should wait for login action', take(LOGIN)),
    selects('should select email and pass from storage', auth, store),
    throws(does('should catch error', call(console.log, 'login error'), 'login error')),
    does('should stop loader', put({ type: 'LOADING_STOP' })),
    does('should wait for login action', take(LOGIN)),
  ]),
);

const authorizePartFlow2 = (t?: string) => [
  does('should get user by token', call(getUserByToken, token), t),
  does('should dispatch user', put(userActions.setUser(getUserByToken(token))), getUserByToken(token)),
  does('should dispatch authorize', put(authActions.authorize({ token }))),
];

describe(
  'Authorize flow in case token passed',
  saga(authorize, [does('should set token to LS', call(setItem, 'idToken', token)), ...authorizePartFlow2()], token),
);

describe(
  'Authorize flow in case token not passed',
  saga(authorize, [does('should wait for login action', call(getItem, 'idToken')), ...authorizePartFlow2(token)]),
);

describe(
  'Logout flow',
  saga(logout, [
    does('should wait for logout action', take(LOGOUT)),
    does('should call unauthorize flow', call(unauthorize)),
  ]),
);

describe(
  'Unauthorize flow',
  saga(unauthorize, [
    does('should dispatch unauthorize action', put(authActions.unauthorize())),
    does('should remove torkn from LS', call(removeItem, 'idToken')),
  ]),
);

test('SignIn function', () => {
  expect(signIn(email, password)).toBe('2+2=4');
});

test('getUserByToken function', () => {
  expect(getUserByToken(token)).toEqual({
    email: 'e@mail.com',
    name: 'Dart',
    lastname: 'Waider',
  });
});

test('verifyToken function', () => {
  expect(verifyToken('2+2=4')).toBeTruthy();
  expect(verifyToken('2+2=5')).toBeFalsy();
});
