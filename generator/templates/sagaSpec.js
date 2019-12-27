module.exports = ({ name, naMe, Name }) => `import ${naMe} from './${name}';

describe('Saga: ${Name} - test case', () => {
  test('unit test', () => {
    expect(2 + 2).toEqual(4);
  });
});
`;
