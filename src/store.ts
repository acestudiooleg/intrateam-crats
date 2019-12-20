import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { Routes } from './constants';

import createRootReducer from './reducers';
import appSagas from './sagas';

export const history = process.env.IS_SSR ? createMemoryHistory({ 
    initialEntries: [process.env.REACT_APP_BASENAME || Routes.Dashboard]
}) : createBrowserHistory({
    basename: process.env.REACT_APP_BASENAME || Routes.Dashboard,
});

const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);

const middlewares = [sagaMiddleware, routeMiddleware];
let composer: any = compose;

// if (REACT_APP_ENV === 'develop' || REACT_APP_ENV === 'local') {
//   composer = composeWithDevTools;
// }

composer = composeWithDevTools;

const store = createStore(
  createRootReducer(history),
  undefined,
  composer(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(appSagas);

export default store;
