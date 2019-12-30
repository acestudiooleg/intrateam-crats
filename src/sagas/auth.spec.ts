import { call } from 'redux-saga/effects';
import { saga, does, ends } from '../utils/saga';
import { getItem } from '../utils/localStorage';
import auth, { verifyToken, authorize, logout, login } from './auth';

const token = '123';
describe(
  'Authorize when token exists',
  saga(auth, [
    does('should get token from localstorage', call(getItem, 'idToken')),
    does('should verify token - in case when token is valid', call(verifyToken, token), token),
    does('should call authorize flow', call(authorize, token), token),
    does('should call logout flow', call(logout)),
    does('should call logout flow', call(login)),
    ends(),
  ]),
);

describe(
  'Authorize when token does not exists',
  saga(auth, [
    does('should get token from localstorage', call(getItem, 'idToken')),
    does('should call logout flow', call(login)),
    ends(),
  ]),
);
