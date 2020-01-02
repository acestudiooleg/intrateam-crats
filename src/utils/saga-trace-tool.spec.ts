import traceTool from './saga-trace-tool';

function* MySaga(value: number) {
  yield value + 1;
}

const makeEffect = (type, payload) => ({
  '@@redux-saga/IO': true,
  type,
  payload,
});

describe('trace tool', () => {
  const tool = traceTool(MySaga, true);

  test('parseSaga', () => {
    const obj = makeEffect('test', { args: 'xxyy' });
    const res = tool.parseSaga(obj);
    expect(res).toEqual({
      args: obj.payload.args,
      body: obj.payload,
      name: obj.type,
    });
  });

  test('parseSaga - not saga', () => {
    const obj = {
      type: 'test',
    };
    const res = tool.parseSaga(obj);
    expect(res).toBeFalsy();
  });

  test('does PUT', () => {
    const log = jest.fn();
    const type = 'xxyy';
    const obj = makeEffect('PUT', { action: { type } });
    const r = `----- 1: DOES -----\n\n --- src: ---\n PUT[${type}]\n\n --- test: ---\n PUT[${type}]`;
    tool.does(obj, obj, 0, log);
    expect(log.mock.calls[0][0]).toBe('\n');
    expect(log.mock.calls[1][0]).toBe(r);
  });

  test('does TAKE', () => {
    const log = jest.fn();
    const pattern = 'xxyy';
    const obj = {
      '@@redux-saga/IO': true,
      type: 'TAKE',
      payload: { pattern },
    };
    const r = `----- 1: DOES -----\n\n --- src: ---\n TAKE[${pattern}]\n\n --- test: ---\n TAKE[${pattern}]`;
    tool.does(obj, obj, 0, log);
    expect(log.mock.calls[0][0]).toBe('\n');
    expect(log.mock.calls[1][0]).toBe(r);
  });

  test('does TAKE', () => {
    const log = jest.fn();
    const pattern = 'xxyy';
    const obj = makeEffect('TAKE', { pattern });
    const r = `----- 1: DOES -----\n\n --- src: ---\n TAKE[${pattern}]\n\n --- test: ---\n TAKE[${pattern}]`;
    tool.does(obj, obj, 0, log);
    expect(log.mock.calls[0][0]).toBe('\n');
    expect(log.mock.calls[1][0]).toBe(r);
  });

  test('does Call', () => {
    const log = jest.fn();
    const args = 'xxyy';
    const obj = makeEffect('CALL', { args });
    const r = `----- 1: DOES -----\n\n --- src: ---\n CALL["${args}"]\n\n --- test: ---\n CALL["${args}"]`;
    tool.does(obj, obj, 0, log);
    expect(log.mock.calls[0][0]).toBe('\n');
    expect(log.mock.calls[1][0]).toBe(r);
  });

  test('does RACE', () => {
    const log = jest.fn();
    const obj = makeEffect('RACE', { a: 1, b: 2 });
    const r = `----- 1: DOES -----\n\n --- src: ---\n RACE[a,b]\n\n --- test: ---\n RACE[a,b]`;
    tool.does(obj, obj, 0, log);
    expect(log.mock.calls[0][0]).toBe('\n');
    expect(log.mock.calls[1][0]).toBe(r);
  });

  test('selects', () => {
    const log = jest.fn();
    const obj = { a: 1, b: 2 };
    const r = `- 1: SELECTS  - {\n  "a": 1,\n  "b": 2\n}<>{\n  "a": 1,\n  "b": 2\n} `;
    tool.selects(obj, obj, 0, log);
    expect(log.mock.calls[0][0]).toBe('\n');
    expect(log.mock.calls[1][0]).toBe(r);
  });

  test('throws', () => {
    const log = jest.fn();
    const r = `-> 1: THROWS`;
    tool.throws(0, log);
    expect(log.mock.calls[0][0]).toBe('\n');
    expect(log.mock.calls[1][0]).toBe(r);
  });
});
