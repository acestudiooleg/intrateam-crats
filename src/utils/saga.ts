/* eslint-disable @typescript-eslint/no-explicit-any */
import traceTool from './saga-trace-tool';
/**
 *
 * (*1*)
 * - value for method of generator - next(arg), throw(arg)
 * also it is result of assignment yield to variable for
 * next interation of generator
 *
 *  function* gen(){
 *    // TO ===>
 *    let x = yield 10;
 *    console.log(x) // x == 20
 *  }
 *  let i= gen();
 *  let x = i.next().value; // x == 10
 *
 *  //**MAGIC**
 *  let arg = x + 10;
 *  i.next( arg ) // FROM ===>
 *
 *
 * (*2*)
 *
 * @return {Function}
 *    @param {Object} gen - generator
 *    @param {Object} t - ava test object
 *    @param {Funcion} next
 *      - method of generator - next|throw
 */

export const loggerHelper = (turnOn: boolean, fullMessage: string) => (step, obj) => {
  if (!turnOn) {
    return;
  }
  const key = Object.keys(obj)[0];
  const message = JSON.stringify(obj[key], null, '\t');
  const cutMessage = fullMessage ? message : (message || '').substr(0, 300) + '... <--CUT';
  console.log(` Result of "${step}"`);
  console.log('====================');
  console.log(`   ${key}:`, cutMessage);
  console.log('--------------------\n');
};

/**
 * Execute tests step-by-step
 *
 *    saga(sagaGenerator, [
 *      take('action'), call(http, '/google')
 *    ])
 *
 * @param  {Function} f saga generator function
 * @param  {Array} steps
 *  - every step has test like yuild in original generator
 */
export const saga = (f, steps, ...args) => () => {
  const maybeTrace = steps[0];
  let isTrace = false;
  if (typeof maybeTrace === 'string' && maybeTrace === 'trace') {
    isTrace = true;
    steps = steps.slice(1, steps.length + 1);
  }
  const traceObj = traceTool(f, isTrace);

  const gen = f(...args);
  steps.forEach((step, i) => {
    step(gen, undefined, { c: i, traceObj });
  });
};

/**
 * Pass argument to generator, useful if test end on some step and need finish
 * @param  {[type]} arg *1
 */
export const passPrev = arg => (gen, next = 'next') => gen[next](arg);

/**
 * Execute toEqual test between value from generator
 * and passed param
 *
 * @param  {Function} step - yield step of generator
 * @param  {any} arg
 */
export const does = (testDesc: string, step, arg?: any) => (gen, next = 'next', { c, traceObj }) =>
  test(testDesc, () => {
    const actual = gen[next](arg).value;
    traceObj.does(step, actual, c);
    expect(actual).toEqual(step);
  });

export const ends = (arg?: any) => (gen, next = 'next') =>
  test('End of generator', () => expect(gen[next](arg).done).toBeTruthy());

/**
 * Helper for Saga's effect select
 * @param  {string} testDesc - test title
 * @param  {{}} item - part of redux store
 * @param  {{}}} state full redux store
 * @param  {any} arg
 */
export const selects = (testDesc, item, state, arg?: any) => (gen, next = 'next', { c, traceObj }) =>
  test(testDesc, () => {
    const step = gen[next](arg).value;
    expect(step.SELECT.selector instanceof Function).toBeTruthy();
    const result = step.SELECT.selector(state);
    traceObj.selects(result, item, c);
    expect(result).toEqual(item);
  });

export const throws = stepFn => (gen, x, { c, traceObj }) => {
  traceObj.throws(c);
  stepFn(gen, 'throw', { c, traceObj });
};
