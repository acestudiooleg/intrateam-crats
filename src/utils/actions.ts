/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAction } from './redux-create-reducer';

type ActionCreator = (payload?: any) => IAction;

interface IActionModule {
  [key: string]: ActionCreator;
}

interface ITypesObject {
  [key: string]: string;
}

export const createAction = <P>(type: string) => (payload: P) => ({
  type,
  payload,
});
export const createEmptyAction = (type: string) => () => ({
  type,
  payload: {},
});

export const fakeAction = (payload?: any) => ({ type: 'fake', payload });

export const actionSeq = (actionsModule: IActionModule, types: ITypesObject, seq: any[]) => () =>
  seq.forEach(f => f(actionsModule, types));

export const act = (type: string, func: ActionCreator, withData?: boolean) => () =>
  test(`Action ${type} works fine`, () => {
    const data = { [type]: `action type` };
    const action = func(withData ? data : undefined);
    const expected = { type, payload: withData ? data : {} };
    expect(action).toEqual(expected);
  });

export const hasType = (...typesArgs: string[]) => (actionsModule: IActionModule, types: ITypesObject) =>
  test(`Action types exist in types object`, () => {
    expect(typesArgs).toEqual(Object.values(types));
  });

export const hasFunc = (...funcsArgs: ActionCreator[]) => (actionsModule: IActionModule) =>
  test(`Action function exist in module default`, () => {
    expect(funcsArgs).toEqual(Object.values(actionsModule));
  });
