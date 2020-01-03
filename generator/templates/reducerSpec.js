module.exports = ({ name, naMe, Name }) => `import ${naMe}, { initialState, get${Name} } from './${name}';
import { testReducer, cs } from '../utils/reducer';
import { fetch, fetchSuccess, fetchFailure } from '../actions/${name}';

const err = new Error('error ${name}');

const data = { body: 'hello ${name}' };

describe(
  '${Name} reducer',
  testReducer(${naMe}, initialState, [
    cs('should fetch', fetch(), { isLoading: true }),
    cs(
      'should fetch success',
      fetchSuccess({ body: 'hello ${name}' }),
      { data },
      { ...initialState, isLoading: true },
    ),
    cs('should fetch failure', fetchFailure(err), { error: err }),
  ]),
);

test('get${Name} getter should return correct value', () => {
  const state = {
    ${naMe}: {
      isLoading: true,
      data,
    },
  };
  expect(get${Name}(state)).toEqual(state.${naMe});
});
`;
