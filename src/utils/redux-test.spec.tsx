import { splitArrayBy, watchState } from './redux-test';

test('splitArrayBy', () => {
  const arr = [1, 2, 3];
  const expected = [[1], [2, 3]];
  const result = splitArrayBy(arr, el => el === 2);
  expect(result).toEqual(expected);
});

test('watchState', () => {
  const log = jest.fn();
  const state = { hello: 'world' };
  watchState('hello', log)({ state });
  expect(log.mock.calls[0][0]).toBe(state.hello);
});

test('watchState withou path', () => {
  const log = jest.fn();
  const state = { hello: 'world' };
  watchState(undefined, log)({ state });
  expect(log.mock.calls[0][0]).toEqual(state);
});
