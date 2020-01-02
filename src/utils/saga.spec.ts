import { saga, passPrev } from './saga';

function maybeSaga(value) {
  return step => ({ value, step });
}

function* MySaga(value: number) {
  yield value + 1;
}

const value = 'hello';

test('Saga helper should correctly call steps', () => {
  saga(
    maybeSaga,
    [
      f => expect(f('hello')).toEqual({ value, step: 'hello' }),
      f => expect(f('expo')).toEqual({ value, step: 'expo' }),
      (f, x) => expect(x).toBeUndefined(),
      (f, x, { c }) => expect(c).toBe(3),
    ],
    value,
  )();
});

test('Saga helper should correctly call steps', () => {
  saga(maybeSaga, ['trace', (f, x, { c, traceObj }) => expect(traceObj.isActive).toBeTruthy()], value)();
});

test('passPrev', () => {
  const gen = MySaga(2);
  const step = passPrev(3)(gen);
  expect(step.value).toBe(3);
});
