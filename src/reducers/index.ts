import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import auth from './auth';
import user from './user';
// inject import
import cocaCola from './coca-cola';

export default (history: History): Reducer =>
  combineReducers({
    router: connectRouter(history),
    auth,
    user,
    // inject usage
    cocaCola,
  });
