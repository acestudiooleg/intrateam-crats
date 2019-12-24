import { call } from 'redux-saga/effects';
import { getItem } from '../utils/localStorage';
import auth, { verifyToken, authorize, logout, login } from './auth';

describe('Authorize when token exists', () => {
  const token = '123456';
  const gen = auth();
  test('should get token from localstorage', () => {
    const called = call(getItem, 'idToken');
    const step = gen.next().value;
    expect(step).toEqual(called);
  });

  test('should verify token - in case when token is valid', () => {
    const called = call(verifyToken, token);
    const step = gen.next(token).value;
    expect(step).toEqual(called);
  });

  test('should call authorize flow', () => {
    const called = call(authorize, token);
    const step = gen.next(token).value;
    expect(step).toEqual(called);
  });

  test('should call logout flow', () => {
    const called = call(logout);
    const step = gen.next().value;
    expect(step).toEqual(called);
  });

  test('should call login flow', () => {
    const called = call(login);
    const step = gen.next().value;
    expect(step).toEqual(called);
  });
});

describe('Authorize when token does not exists', () => {
  const gen = auth();
  test('should get token from localstorage', () => {
    const called = call(getItem, 'idToken');
    const step = gen.next().value;
    expect(step).toEqual(called);
  });

  test('should call login flow', () => {
    const called = call(login);
    const step = gen.next().value;
    expect(step).toEqual(called);
  });
});
