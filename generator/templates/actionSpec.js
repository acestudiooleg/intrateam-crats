module.exports = ({ name, Name, NA_ME }) => `import {
  FETCH_${NA_ME},
  FETCH_${NA_ME}_SUCCESS,
  FETCH_${NA_ME}_FAILURE,
  fetch,
  fetchSuccess,
  fetchFailure,
} from './${name}';

describe('Actions ${Name} - test case', () => {
  test('unit test', () => {
    expect(2 + 2).toEqual(4);
  });
});
`;
