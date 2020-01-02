import auth, { initialState } from './auth';
import { testReducer, cs } from '../utils/reducer';
import { authorize, unauthorize, login } from '../actions/auth';
const authObject = {
  token: 'hello',
};
const authPair = {
  email: 'asd',
  password: 'asdaf',
};

const authorized = { authObject, authorized: true };

describe(
  'Auth reducer',
  testReducer(auth, initialState, [
    cs('should authorize', authorize(authObject), authorized),
    cs('should unauthorize', unauthorize(), initialState, { ...authorized, authPair: {} }),
    cs('should login', login(authPair), { authPair }),
  ]),
);
