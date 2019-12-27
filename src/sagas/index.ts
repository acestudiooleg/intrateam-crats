import { all } from 'redux-saga/effects';

import auth from './auth';
// inject import
import cocaCola from './coca-cola';

const allSagas = [
  auth,
  // inject usage
    cocaCola,
];

export default function* appSagas() {
  yield all(allSagas.map(f => f()));
}
