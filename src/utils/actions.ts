/* eslint-disable @typescript-eslint/no-explicit-any */
export const createAction = (type: string) => (payload: any) => ({
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
