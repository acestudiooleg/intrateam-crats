import { createAction, createEmptyAction } from '../utils/actions';

export interface IAuthObject {
  token?: string;
}

export interface IAuthPair {
  email?: string;
  password?: string;
}

export const LOGIN = 'AUTH/LOGIN';
export const AUTHORIZE = 'AUTH/AUTHORIZE';
export const UNAUTHORIZE = 'AUTH/UNAUTHORIZE';
export const LOGOUT = 'AUTH/LOGOUT';

export const types = {
  LOGOUT,
  AUTHORIZE,
  LOGIN,
};

export const login = createAction<IAuthPair>(LOGIN);
export const authorize = createAction<IAuthObject>(AUTHORIZE);
export const unauthorize = createEmptyAction(UNAUTHORIZE);
export const logout = createEmptyAction(LOGOUT);

export default {
  login,
  authorize,
  unauthorize,
  logout,
};
