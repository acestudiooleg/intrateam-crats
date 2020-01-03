/* eslint-disable @typescript-eslint/no-explicit-any */
import traceTool, { ITrace } from './saga-trace-tool';
import { Saga, SagaIterator } from 'redux-saga';
import { Effect } from 'redux-saga/effects';

interface ITraceHelper {
  c: number;
  traceObj: ITrace;
}

type Step = (iter: SagaIterator, next?: 'next' | 'throw', obj?: ITraceHelper) => void;

/**
 * Execute tests step-by-step
 * @param  {Function} f saga generator function
 * @param  {Array} steps - every step has test like yuild in original generator
 * @example 
 * // saga
  function* MySaga (value: number) {
    const a = yield value + 3;
    const b = yield a - 1;
    const c = yield b * 10;
    return 'Done with: ' + c;
  }
  const x = MySaga(5);
  console.log(x.next()); // yield 5 + 3 - {value: 8, done: false}
  console.log(x.next(5 + 3)); // yield 8 - 1 - {value: 6, done: false}
  console.log(x.next(8 - 1)); // yield 7 * 10 - {value: 70, done: false}
  console.log(x.next(7 * 10)); // return 7 * 10 - {value: "done with: 70", done: true}

  // default test view
  describe('test MySaga', () => {
    const initValue = 5;
    const gen = MySaga(initValue);
    test('should calculate "8"', () => {
      const step = gen.next();
      expect(step.value).toBe(8);
      expect(step.done).toBeFalsy();
    });
    test('should calculate "7"', () => {
      const step = gen.next(8);
      expect(step.value).toBe(7);
      expect(step.done).toBeFalsy();
    });
    test('should calculate "70"', () => {
      const step = gen.next(70);
      expect(step.value).toBe(70);
      expect(step.done).toBeFalsy();
    });
    test('should calculatea nd return "Done with: 70" and finish iteration', () => {
      const step = gen.next(70);
      expect(step.value).toBe('Done with: 70');
      expect(step.done).toBeTruthy();
    });
  });

  // with saga test helper
  const initValue = 5;
  describe('test MySaga', saga(() => MySaga(initValue), [
    does('should calculate "8"', 8),
    does('should calculate "7"', 7, 8),
    does('should calculate "8"', 70, 7),
    does('should return "Done with: 70"', 70, 'Done with: 70'),
  ]));
 */
export const saga = (f: Saga, steps: Step[], ...args: any[]) => () => {
  const maybeTrace = steps[0];
  let isTrace = false;
  if (typeof maybeTrace === 'string' && maybeTrace === 'trace') {
    isTrace = true;
    steps = steps.slice(1, steps.length + 1);
  }
  const traceObj = traceTool(f, isTrace);

  const iter: SagaIterator = f(...args);
  steps.forEach((step: Step, i: number) => {
    step(iter, undefined, { c: i, traceObj });
  });
};

/**
 * Pass argument to generator, useful if test end on some step and need finish
 * @param  {any} arg - argument as result of previous "yield"
 * @example 
 * // saga
  function* MySaga () {
    yield 2 + 2;
  }

  describe('test MySaga', saga(MySaga, [
    does('should calculate "4"', 4),
    passPrev(4),
  ]));
 */
export const passPrev = (arg): Step => (iter, next = 'next') => iter[next](arg);

/**
 * Execute toEqual test between value from generator and passed param
 *
 * @param  {Function} step - yield step of generator
 * @param  {any} arg -  - argument as result of previous "yield"
 * @example 
 * // saga
  function* MySaga () {
    yield 2 + 2;
  }

  describe('test MySaga', saga(MySaga, [
    does('should calculate "4"', 4),
    ends(4),
  ]));
 */
export const does = (testDesc: string, step: Effect, arg?: any): Step => (iter, next = 'next', { c, traceObj }) =>
  test(testDesc, () => {
    const actual: Effect = iter[next](arg).value;
    traceObj.does(step, actual, c);
    expect(actual).toEqual(step);
  });

/**
 * Check if iterations are done
 * @param arg - argument as result of previous "yield"
 */
export const ends = (arg?: any) => (gen, next = 'next') =>
  test('End of generator', () => expect(gen[next](arg).done).toBeTruthy());

/**
 * Helper for Saga's effect select
 * @param  {string} testDesc - test title
 * @param  {{}} item - part of redux store
 * @param  {{}}} state full redux store
 * @param  {any} arg
 * @example 
 * // saga
  function* MySaga () {
    const step = yield call(getStep);
    const counter = yield select((state) => state.counter);
    yield put({type: 'increase', payload: counter.value + step});
  }

  describe('test MySaga', saga(MySaga, [
    does('should get step', call(getStep)),
    selects('should select counter', {value: 4}, {counter: {value: 4}}, 5),
    does('should dispatch 9', put({type: 'increase', payload: 9})),
  ]));
 */
export const selects = (testDesc: string, item: object, state: object, arg?: any): Step => (
  gen,
  next = 'next',
  { c, traceObj },
) =>
  test(testDesc, () => {
    const step = gen[next](arg).value;
    expect(step.payload.selector instanceof Function).toBeTruthy();
    const result = step.payload.selector(state);
    traceObj.selects(result, item, c);
    expect(result).toEqual(item);
  });

/**
   * Helper to test error
   * !! Important - before throw error should be called at least one yield inside TRY block
   * @param stepFn
   * @example 
  // saga
  function* MySaga () {
    try {
      const step = yield call(getStep); // <- important step inside TRY
      const counter = yield select((state) => state.counter);
      yield put({type: 'increase', payload: counter.value + step});
    } catch(err) {
      yield put({ type: 'error', payload: err });
    }
  }

  describe('test MySaga', saga(MySaga, [
    does('get step', call(getStep)), // <- important step
    throws(does('should dispatch error', put({type: 'error', payload: 'Ooops' }), Ooops)),
  ]));
 */
export const throws = (stepFn: Step): Step => (iter, next = 'throw', { c, traceObj }) => {
  traceObj.throws(c);
  stepFn(iter, next, { c, traceObj });
};
