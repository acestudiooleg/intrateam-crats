import { all } from 'redux-saga/effects';

import auth from './auth';

const allSagas = [auth()];

export default function* appSagas() {
  yield all(allSagas);
}
