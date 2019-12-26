module.exports = ({ NA_ME }) => `import { createAction, createEmptyAction, createErrorAction } from '../utils/actions';

export const FETCH_${NA_ME} = '${NA_ME}/FETCH';
export const FETCH_${NA_ME}_SUCCESS = '${NA_ME}/FETCH_SUCCESS';
export const FETCH_${NA_ME}_FAILURE = '${NA_ME}/FETCH_FAILURE';

export const types = {
  FETCH_${NA_ME},
  FETCH_${NA_ME}_SUCCESS,
  FETCH_${NA_ME}_FAILURE,
};

export const fetch = createEmptyAction(FETCH_${NA_ME});
export const fetchSuccess = createAction(FETCH_${NA_ME}_SUCCESS);
export const fetchFailure = createErrorAction(FETCH_${NA_ME}_FAILURE);

export default {
  fetch,
  fetchSuccess,
  fetchFailure,
};
`;
