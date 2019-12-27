import { all } from 'redux-saga/effects';

import auth from './auth';
// inject import

const allSagas = [
  auth,
  // inject usage
];

export default function* appSagas() {
  yield all(allSagas.map(f => f()));
}
