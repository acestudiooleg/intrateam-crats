import React, { Suspense, lazy, ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import ProtectedRoute from './containers/ProtectedRoute';
import { Routes } from './constants';
import { history } from './store';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Settings = lazy(() => import('./pages/Settings'));
// inject import
const ColaCoca = lazy(() => import('./pages/ColaCoca'));

const App = (): ReactElement => (
  <div className="App">
    <ConnectedRouter history={history}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <ProtectedRoute path={Routes.Settings} component={Settings} />
          <Route path={Routes.Dashboard} exact component={Dashboard} />
          <Route path={Routes.Login} exact component={Login} />
          {/* inject usage */}
          <Route path={Routes.ColaCoca} exact component={ColaCoca} />
        </Switch>
      </Suspense>
    </ConnectedRouter>
  </div>
);

export default App;
