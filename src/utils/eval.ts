// Evaluates non-string object values e.g. 'true' => true, '123' => 123, etc.

const evl = (val:any) => {
  try { return JSON.parse(val); } catch { return val; }
};


export const evalObject = <T>(obj: object): {[P in keyof T]?: any} => Object.keys(obj).reduce(
  (res, key) => ({ ...res, [key]: evl(obj[key]) }),
  {},
);


export default {
  evalObject,
};
