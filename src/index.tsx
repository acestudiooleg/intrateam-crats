import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import store from './store';
import './App.scss';

const rootElement = document.getElementById('root') as HTMLElement;

const render = (Application: React.FC): void => {
  ReactDOM.render(
    <Provider store={store}>
      <Application />
    </Provider>,
    rootElement,
  );
};

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement);
} else {
  render(App);
}

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
