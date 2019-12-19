import { createAction, createEmptyAction } from '../utils/actions';
export const LOGIN = 'AUTH/LOGIN';
export const AUTHORIZE = 'AUTH/AUTHORIZE';
export const UNAUTHORIZE = 'AUTH/UNAUTHORIZE';
export const LOGOUT = 'AUTH/LOGOUT';

export const types = {
  LOGOUT,
  AUTHORIZE,
  LOGIN,
};

export const login = createAction(LOGIN);
export const authorize = createAction(AUTHORIZE);
export const unauthorize = createEmptyAction(UNAUTHORIZE);
export const logout = createEmptyAction(LOGOUT);

export default {
  login,
  authorize,
  unauthorize,
  logout,
};
