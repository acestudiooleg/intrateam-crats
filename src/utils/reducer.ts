import { fakeAction } from './actions';
import { IAction } from './redux-create-reducer';

type Reducer = (state: any, action: IAction) => any;

export const act = (testName: string, action: IAction, expected: any, preparedState?: any) => (
  reducer: Reducer,
  initialState,
) => {
  test(testName, () => {
    const state = reducer(preparedState, action);
    expect(state).toEqual({ ...initialState, ...expected });
  });
};

export const testReducer = (reducer, initialState, testSeq: any[]) => () => {
  test('should set initial state', () => {
    const state = reducer(undefined, fakeAction());
    expect(state).toBe(initialState);
  });
  testSeq.forEach(f => f(reducer, initialState));
};
