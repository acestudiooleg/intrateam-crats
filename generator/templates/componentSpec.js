module.exports = ({ naMe, Name }) => `import ${naMe} from './index';

describe('Component: ${Name} - test case', () => {
  test('unit test', () => {
    expect(2 + 2).toEqual(4);
  });
});
`;
