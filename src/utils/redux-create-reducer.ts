import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

interface Action {
  type: string;
}
interface AnyAction extends Action {
  [extraProps: string]: any;
}

type Reducer<S> = (state: S, action: AnyAction) => any;
type InnerReducer<S> = (action: AnyAction, state: S) => any;

type Handlers<A extends Action = AnyAction> = {
  [type: string]: InnerReducer<A>;
};

let __DEV__ = false;
try {
  __DEV__ = process.env.NODE_ENV !== 'production';
} catch (e) {}

const createReducer = <S, A extends Action = AnyAction>(initialState, handlers: Handlers<A>): Reducer<A> => {
  if (__DEV__ && handlers['undefined']) {
    console.warn('Reducer contains an "undefined" action type. Have you misspelled a constant?');
  }

  return function reducer(state, action) {
    if (state === undefined) state = initialState;

    if (handlers.hasOwnProperty(action.type)) {
      const result = handlers[action.type](action, state);
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
