module.exports = ({ name, NaMe, Name }) => `import ${NaMe} from './${name}';

describe('Reducers: ${Name} - test case', () => {
  test('unit test', () => {
    expect(2 + 2).toEqual(4);
  });
});
`;
