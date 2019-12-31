import createReducer from '../utils/redux-create-reducer';
import { AUTHORIZE, LOGIN, UNAUTHORIZE, IAuthObject, IAuthPair } from '../actions/auth';

export interface IAuthState {
  authorized: boolean;
  authObject: IAuthObject;
  authPair: IAuthPair;
}

export const initialState: IAuthState = {
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
