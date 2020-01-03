module.exports = ({ naMe, NA_ME, name }) => `import { call, put, take } from 'redux-saga/effects';
import { FETCH_${NA_ME}, fetchSuccess, fetchFailure } from '../actions/${name}';

export const fetch = () => 'hello world';

export default function* ${naMe}() {
  yield take(FETCH_${NA_ME});
  try {
    const response = yield call(fetch);
    yield put(fetchSuccess(response));
  } catch (e) {
    yield put(fetchFailure(e));
  }
}
`;
