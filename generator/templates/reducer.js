module.exports = ({ name, naMe, NA_ME, Name }) => `import createReducer from '../utils/redux-create-reducer';
import { FETCH_${NA_ME}, FETCH_${NA_ME}_SUCCESS, FETCH_${NA_ME}_FAILURE, I${Name}Data } from '../actions/${name}';

export interface I${Name} {
  isLoading?: boolean;
  data: I${Name}Data | null;
  error?: any;
}

interface IState {
  ${naMe}: I${Name};
}

export const initialState: I${Name} = {
  isLoading: false,
  data: null,
  error: null,
};

export const get${Name} = (state: IState): I${Name} => state.${naMe};

export default createReducer(initialState, {
  [FETCH_${NA_ME}]: () => ({ isLoading: true }),
  [FETCH_${NA_ME}_SUCCESS]: data => ({ data, isLoading: false }),
  [FETCH_${NA_ME}_FAILURE]: error => ({ error, isLoading: false }),
});
`;
