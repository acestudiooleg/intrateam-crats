import createReducer from '../utils/redux-create-reducer';
import { AUTHORIZE, LOGIN, UNAUTHORIZE } from '../actions/auth';

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

export const getAuth = (state: { auth: IAuthState }): IAuthState => state.auth;

export default createReducer(initialState, {
  [LOGIN]: authPair => ({ authPair }),
  [UNAUTHORIZE]: () => ({ authorized: false, authObject: {} }),
  [AUTHORIZE]: authObject => ({ authObject, authorized: true }),
});
