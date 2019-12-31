import auth, { initialState } from './auth';
import { testReducer, act } from '../utils/reducer';
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
    act('should authorize', authorize(authObject), authorized),
    act('should unauthorize', unauthorize(), initialState, { ...authorized, authPair: {} }),
    act('should login', login(authPair), { authPair }),
  ]),
);
