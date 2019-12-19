import { createAction, createEmptyAction } from '../utils/actions';

export const SET_USER = 'USER/SET';
export const DROP_USER = 'AUTH/DROP';

export const types = {
  SET_USER,
  DROP_USER,
};

export const setUser = createAction(SET_USER);
export const dropUser = createEmptyAction(DROP_USER);

export default {
  setUser,
  dropUser,
};
