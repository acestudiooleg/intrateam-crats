/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IState {
  [key: string]: any;
}

export interface IAction {
  type: string;
  payload: any;
}

export type Reducer = (payload: any, state: IState, type: string) => IState;

interface IHandlers {
  [key: string]: Reducer;
}

let __DEV__ = false;
try {
  __DEV__ = process.env.NODE_ENV !== 'production';
} catch (e) {}

const createReducer = (initialState: IState = {}, handlers: IHandlers) => {
  if (__DEV__ && handlers['undefined']) {
    console.warn('Reducer contains an "undefined" action type. Have you misspelled a constant?');
  }

  return function reducer(state = initialState, action: IAction) {
    if (handlers.hasOwnProperty(action.type)) {
      const result = handlers[action.type](action.payload, state, action.type);
      return { ...state, ...result };
    }
    return state;
  };
};

export default createReducer;
