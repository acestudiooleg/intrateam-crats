module.exports = ({ name, naMe, Name, NA_ME }) => `import { call, put, take } from 'redux-saga/effects';
import ${naMe}, { fetch } from './${name}';
import { saga, does, ends, throws } from '../utils/saga';

import { FETCH_${NA_ME}, fetchSuccess, fetchFailure } from '../actions/${naMe}';

const response = 'hello world';

test('fetch function', () => {
  expect(fetch()).toBe(response);
});

describe(
  'Saga: ${Name} - positive test case',
  saga(${naMe}, [
    does('should wait for fetch action', take(FETCH_${NA_ME})),
    does('should fetch data', call(fetch)),
    does('should dispatch data', put(fetchSuccess(response)), response),
    ends()
  ])
);

describe(
  'Saga: ${Name} - negative test case',
  saga(${naMe}, [
    does('should wait for fetch action', take(FETCH_${NA_ME})),
    does('should fetch data', call(fetch)),
    throws(does('should dispatch error', put(fetchFailure('some error')), 'some error')),
    ends(),
  ]),
);
`;
