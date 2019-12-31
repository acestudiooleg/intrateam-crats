/* eslint-disable @typescript-eslint/no-explicit-any */
export const createAction = <P>(type: string) => (payload: P) => ({
  type,
  payload,
});
export const createEmptyAction = (type: string) => () => ({
  type,
  payload: {},
});
export const createErrorAction = (type: string) => (error: any) => ({
  type,
  error,
});

export const fakeAction = (payload?: any) => ({ type: 'fake', payload });
