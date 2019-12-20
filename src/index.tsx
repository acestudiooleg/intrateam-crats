import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import store from './store';
import './App.scss';

const render = (Application: any) =>
  ReactDOM.render(
      <Application />,
    document.getElementById('root') as HTMLElement,
  );

render(App);

// if (module.hot) {
//   module.hot.accept('./App', () => {
//     const NextApp = require('./App').default;
//     render(NextApp);
//   });
// }

// registerServiceWorker();
