module.exports = ({ name, Name, NA_ME, naMe }) => `import { actionSeq, act, hasFunc, hasType } from '../utils/actions';
import ${naMe}, {
  FETCH_${NA_ME},
  FETCH_${NA_ME}_SUCCESS,
  FETCH_${NA_ME}_FAILURE,
  fetch,
  fetchSuccess,
  fetchFailure,
  types,
} from './${name}';

describe(
  'Actions ${Name} - test case',
  actionSeq(${naMe}, types, [
    act(FETCH_${NA_ME}, fetch),
    act(FETCH_${NA_ME}_SUCCESS, fetchSuccess, true),
    act(FETCH_${NA_ME}_FAILURE, fetchFailure, true),
    hasType(FETCH_${NA_ME}, FETCH_${NA_ME}_SUCCESS, FETCH_${NA_ME}_FAILURE),
    hasFunc(fetch, fetchSuccess, fetchFailure),
  ]),
);
`;
