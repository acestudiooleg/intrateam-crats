import { fakeAction } from './actions';
import { IState, IAction } from './redux-create-reducer';

type Reducer = (state: IState, action: IAction) => IState;

type ReduxTestSeqStep = (reducer: Reducer, initialState: IState) => void;

/**
 * cs - (Case) Test helper to simplify test reducer some case
 * @param {string} testName - Jest test description
 * @param action - Redux action {type, payload}
 * @param expected - Expected data structure to compare with reducer result
 * @param preparedState - prepared state of reducer before action fires
 * @example
 * // reducer
  const initState = {
    value: 0,
  };

  function counter (state = initState, action) {
    switch (action.type) {
      case 'plus':
        return { value: state.value + 1 };
      case 'minus':
        return { value: state.value - 1 };
      case 'new':
        return { value: action.payload };
      default:
        return state;
    }
  }

  // default approach
  describe('test "counter" reducer', () => {

    test('Action type "plus" should increase "counter.value" to one', () => {
      const initState = { value: 0 };
      const result = counter(initState, { type: 'plus' });
      expect(result).toEqual({ value: 1 });
    });

    test('Action type "new" should sent new "counter.value"', () => {
      const initState = { value: 0 };
      const result = counter(initState, { type: 'new', payload: 9 });
      expect(result).toEqual({ value: 9 });
    });
  });

  // cs helper approach
  describe('test "counter" reducer', () => {
  cs(
    'Action type "plus" should increase "counter.value" to one',
    { type: 'plus' },
    { value: 1 },
    { value: 0 },
  )(counter);
  
  cs(
    'Action type "plus" should increase "counter.value" to one',
    { type: 'new', payload: 9 },
    { value: 9 },
    { value: 0 },
  )(counter);
});
 */
export const cs = (testName: string, action: IAction, expected: IState, preparedState?: IState): ReduxTestSeqStep => (
  reducer,
  initialState,
) => {
  test(testName, () => {
    const state = reducer(preparedState, action);
    expect(state).toEqual({ ...initialState, ...expected });
  });
};

/**
 * Jest test helper to simplify test reducers
 * @param reducer - pure function of reducer
 * @param initialState - initial state of reducer
 * @param testSeq - array of test cases - cs
 * @example
 * // reducer
  const initState = {
    value: 0,
  };

  function counter (state = initState, action) {
    switch (action.type) {
      case 'plus':
        return { value: state.value + 1 };
      case 'minus':
        return { value: state.value - 1 };
      case 'new':
        return { value: action.payload };
      default:
        return state;
    }
  }

  // default approach
  describe('test "counter" reducer', () => {

    test('Action type "plus" should increase "counter.value" to one', () => {
      const initState = { value: 0 };
      const result = counter(initState, { type: 'plus' });
      expect(result).toEqual({ value: 1 });
    });

    test('Action type "new" should sent new "counter.value"', () => {
      const initState = { value: 0 };
      const result = counter(initState, { type: 'new', payload: 9 });
      expect(result).toEqual({ value: 9 });
    });
  });

  // testReducer helper approach
  describe('test "counter" reducer', testReducer(counter, {value: 0 }, [
    cs('Action type "plus" should increase "counter.value" to one', { type: 'plus' }, { value: 1 });
    cs('Action type "plus" should increase "counter.value" to one', { type: 'new', payload: 9 }, { value: 9 });
  ]);
 */
export const testReducer = (reducer, initialState, testSeq: ReduxTestSeqStep[]) => () => {
  test('should set initial state', () => {
    const state = reducer(undefined, fakeAction());
    expect(state).toBe(initialState);
  });
  testSeq.forEach(f => f(reducer, initialState));
};
