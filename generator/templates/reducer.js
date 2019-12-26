module.exports = ({ name, NA_ME, Name, naMe }) => `import createReducer from '../utils/redux-create-reducer';
import { getData } from '../utils/reducers';
import { FETCH_${NA_ME}, FETCH_${NA_ME}_SUCCESS, FETCH_${NA_ME}_FAILURE } from '../actions/${name}';

export interface I${Name} {
  isLoading?: boolean;
  data?: any;
  error?: any;
}

interface IState {
  ${naMe}: I${Name}
}

const initialState: I${Name} = {
  isLoading: false,
  data: null,
  error: null,
};

export const getUser = (state: IState): I${Name} => state.${naMe};

export default createReducer(initialState, {
  [FETCH_${NA_ME}]: () => ({ isLoading: true }),
  [FETCH_${NA_ME}_SUCCESS]: ({ payload: data }) => ({ data, isLoading: false }),
  [FETCH_${NA_ME}_FAILURE]: ({ payload: error }) => ({ error, isLoading: false }),
});
`;
