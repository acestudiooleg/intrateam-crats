import { combineReducers, Reducer } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import auth, { IAuthState } from './auth';
import user, { IUser } from './user';
// inject import

export interface IReduxState {
  router: RouterState;
  auth: IAuthState;
  user: IUser;
}

export default (history: History): Reducer =>
  combineReducers({
    router: connectRouter(history),
    auth,
    user,
    // inject usage
  });
