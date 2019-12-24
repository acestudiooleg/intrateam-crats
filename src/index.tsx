import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import store from './store';
import './App.scss';

const render = (Application: React.FC): void => {
  ReactDOM.render(
    <Provider store={store}>
      <Application />
    </Provider>,
    document.getElementById('root') as HTMLElement,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
