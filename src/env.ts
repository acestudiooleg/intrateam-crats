import { evalObject } from './utils/eval';

export const {
  REACT_APP_ENV,
  REACT_APP_BASENAME,
  REACT_APP_LOGIN_URL,
  REACT_APP_LOGOUT_URL,
  IS_SSR  
} = evalObject<NodeJS.ProcessEnv>(process.env);


export const LOGIN_URL = REACT_APP_LOGIN_URL;
export const LOGOUT_URL = `${REACT_APP_LOGOUT_URL}?returnUrl=${REACT_APP_BASENAME}`;
// cms in fact is a mol test env
