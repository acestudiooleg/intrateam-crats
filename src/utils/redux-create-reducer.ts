/* eslint-disable @typescript-eslint/no-explicit-any */
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

interface IAction {
  type: string;
  payload: any;
}

type Reducer = (payload: any, state: any, type: string) => any;

interface IHandlers {
  [key: string]: Reducer;
}

let __DEV__ = false;
try {
  __DEV__ = process.env.NODE_ENV !== 'production';
} catch (e) {}

const createReducer = (initialState: any, handlers: IHandlers) => {
  if (__DEV__ && handlers['undefined']) {
    console.warn('Reducer contains an "undefined" action type. Have you misspelled a constant?');
  }

  return function reducer(state: any, action: IAction) {
    if (state === undefined) state = initialState;

    if (handlers.hasOwnProperty(action.type)) {
      const result = handlers[action.type](action.payload, state, action.type);
      if (isArray(state)) {
        return [...state, ...result];
      }
      if (isObject(state)) {
        return { ...state, ...result };
      }
      return result;
    } else {
      return state;
    }
  };
};

export default createReducer;
