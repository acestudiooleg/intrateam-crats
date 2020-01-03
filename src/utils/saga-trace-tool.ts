/* eslint-disable @typescript-eslint/no-explicit-any */
import { Effect, effectTypes } from 'redux-saga/effects';
import { Saga } from 'redux-saga';

type Log = (data: any) => void;

interface IPayloadWithArgs {
  args: any;
}

interface ISagaStepInfo {
  name: any;
  body: any;
  args: any;
}

export interface ITrace {
  isActive: boolean;
  parseSaga: <T, P extends IPayloadWithArgs>(saga: Effect<T, P>) => ISagaStepInfo;
  getArgsByName: (name: string, body: any) => any;
  does: (step: Effect<string, any>, actual: Effect<string, any>, c: number, log?: Log) => void;
  selects: (exp: object, act: object, c, log?: Log) => void;
  throws: (c, log?: Log) => void;
}

/**
 * Helps watch all executed steps with params
 *
 *  //code example
 *  test('hello', saga(HELLO,[
 *    'trace', <-- this
 *    does(put({type: 'action'})),
 *    does(take('action')),
 *    selects('text', {a: 'text'}),
 *    does(take('action'), 'wrong text')
 *  ]))
 *
 *  //output example
 *  ====== HELLO() =====
 *
 *  - 1: DOES    - TAKE['action']<>TAKE['action']
 *  - 2: DOES    - PUT['another action']<>PUT['another action']
 *  - 3: SELECTS - 'text'<>'wrong text'
 *
 * @param  {Function}  generator saga generator function
 * @param  {Boolean || String} isActive  turn on log in console,
 *  also show name of current active test
 * @return {Object} hash of methods
 */
export default (generator: Saga, isActive: boolean): ITrace => {
  const testName = typeof isActive === 'string' ? isActive : '';
  const body = String(generator);
  const arr = body.match(/function(.*?)\{/);
  const name = ((arr.length > 1 ? arr[1] : arr[0]) || '').trim();
  if (isActive) {
    console.log(`\n===== ${name.length > 2 ? name.replace('()', `(${testName})`) : 'someNestedSaga'} =====`);
  }
  return {
    isActive,
    parseSaga(saga) {
      const sagaId = '@@redux-saga/IO';
      const sagaKeys = Object.keys(saga);
      const isSaga = sagaKeys.some(el => el === sagaId);
      const sagaName = isSaga ? saga.type : 'unknown';
      const sagaBody = isSaga ? saga.payload : null;

      return {
        name: sagaName,
        body: sagaBody,
        args: isSaga ? sagaBody.args : null,
      };
    },
    getArgsByName(name, body) {
      switch (name) {
        case effectTypes.PUT:
          return body.action.type;
        case effectTypes.TAKE:
          return body.pattern;
        case effectTypes.CALL:
          return JSON.stringify(body.args, null, ' ').substr(0, 300);
        case effectTypes.RACE:
          return Object.keys(body);
        default:
          return;
      }
    },
    does(step, actual, c, log = console.log) {
      if (!this.isActive) {
        return;
      }
      const exp = this.parseSaga(step);
      const act = this.parseSaga(actual);

      const nameExp = exp && exp.name;
      const argsExp = this.getArgsByName(nameExp, exp & exp.body, step);
      const nameAct = act && act.name;
      const argsAct = this.getArgsByName(nameAct, act && act.body, actual);
      if (c === 0) {
        log('\n');
      }
      log(
        `----- ${c +
          1}: DOES -----\n\n --- src: ---\n ${nameExp}[${argsExp}]\n\n --- test: ---\n ${nameAct}[${argsAct}]`,
      );
    },
    selects(exp, act, c, log = console.log) {
      if (!this.isActive) {
        return;
      }
      const e = JSON.stringify(exp || 'undefined', null, '  ').substr(0, 300);
      const a = JSON.stringify(act || 'undefined', null, '  ').substr(0, 300);
      if (c === 0) {
        log('\n');
      }
      log(`- ${c + 1}: SELECTS  - ${e}<>${a} `);
    },
    throws(c, log = console.log) {
      if (!this.isActive) {
        return;
      }
      if (c === 0) {
        log('\n');
      }
      log(`-> ${c + 1}: THROWS`);
    },
  };
};
