import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMonitor from '@clarketm/saga-monitor';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { SagaMiddlewareOptions } from 'redux-saga';
import { REACT_APP_ENV } from './env';

import { Routes } from './constants';
import createRootReducer from './reducers';
import appSagas from './sagas';

export const history = createBrowserHistory({
  basename: process.env.REACT_APP_BASENAME || Routes.Dashboard,
});

const development = REACT_APP_ENV === 'develop' || REACT_APP_ENV === 'local';

const sagaConfig: SagaMiddlewareOptions = {};

const composer: any = development ? composeWithDevTools : compose;

if (development) {
  sagaConfig.sagaMonitor = createSagaMonitor({
    level: 'log',
    actionDispatch: true,
  });
}

const sagaMiddleware = createSagaMiddleware(sagaConfig);
const routeMiddleware = routerMiddleware(history);

const middlewares = [sagaMiddleware, routeMiddleware];

const store = createStore(createRootReducer(history), undefined, composer(applyMiddleware(...middlewares)));

sagaMiddleware.run(appSagas);

export default store;
