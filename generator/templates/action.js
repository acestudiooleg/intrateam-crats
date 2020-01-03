module.exports = ({ NA_ME, Name }) => `import { createAction, createEmptyAction } from '../utils/actions';

export interface I${Name}Data {
  [key: string]: any;
}

export const FETCH_${NA_ME} = '${NA_ME}/FETCH';
export const FETCH_${NA_ME}_SUCCESS = '${NA_ME}/FETCH_SUCCESS';
export const FETCH_${NA_ME}_FAILURE = '${NA_ME}/FETCH_FAILURE';

export const types = {
  FETCH_${NA_ME},
  FETCH_${NA_ME}_SUCCESS,
  FETCH_${NA_ME}_FAILURE,
};

export const fetch = createEmptyAction(FETCH_${NA_ME});
export const fetchSuccess = createAction<I${Name}Data>(FETCH_${NA_ME}_SUCCESS);
export const fetchFailure = createAction<Error>(FETCH_${NA_ME}_FAILURE);

export default {
  fetch,
  fetchSuccess,
  fetchFailure,
};
`;
