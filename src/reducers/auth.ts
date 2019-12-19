import { createReducer } from 'redux-create-reducer';
import { AUTHORIZE, LOGIN, UNAUTHORIZE } from '../actions/auth';
import { AnyAction } from 'redux';

export interface IAuthState {
  authorized: boolean;
  authObject: {
    token?: string;
  };
  authPair: {
    email?: string;
    password?: string;
  };
}

export const initialState = {
  authorized: false,
  authObject: {},
  authPair: {},
};

export const getAuth = (state: {auth: IAuthState}) => state.auth;

export default createReducer(initialState, {
  [LOGIN]: (state: IAuthState, { payload: authPair }: AnyAction) => ({
    ...state,
    authPair,
  }),
  [UNAUTHORIZE]: (state: IAuthState) => ({ ...state, authorized: false, authObject: {} }),
  [AUTHORIZE]: (state: IAuthState, { payload: authObject }: AnyAction) => ({
    ...state,
    authObject,
    authorized: true,
  }),
});
