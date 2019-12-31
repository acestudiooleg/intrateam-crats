import React from 'react';
import { Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import _ from 'lodash';
import { createStore } from 'redux';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Routes } from '../constants';
import { push, ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createRootReducer from '../reducers';

Enzyme.configure({ adapter: new Adapter() });

const _createStore = () => {
  const history = createBrowserHistory({ basename: process.env.REACT_APP_BASENAME || Routes.Dashboard });
  const store = createStore(createRootReducer(history));
  return { history, store };
};

const splitArrayBy = (arr: any[], predicate: (el: any, i: number) => boolean) => {
  let index = -1;
  arr.forEach((el, i) => {
    if (predicate(el, i)) {
      index = i;
    }
  });
  if (index !== -1) {
    return [arr.slice(0, index), arr.slice(index, arr.length)];
  }
  return [arr, []];
};

export const { store, history } = _createStore();

export const mount = (child, defaultStore, history) =>
  Enzyme.mount(
    <Provider store={defaultStore}>
      <ConnectedRouter history={history}>
        <Switch>{child}</Switch>
      </ConnectedRouter>
    </Provider>,
  );

const transitionTo = path => {
  if (location.pathname !== path) {
    store.dispatch(push(path));
  }
};

const getRouter = state => ({ ...state.router, transitionTo });

export const reduxSetup = cmpn => (props = {}, actions = [], path = '/') => {
  const { store, history } = _createStore();
  const [actionsBefore, actionsAfter] = splitArrayBy(actions, _.isString);

  actionsBefore.forEach(action => store.dispatch(action));

  let holder = mount(cmpn(props), store, history);

  actionsAfter.forEach(action => (action.type ? store.dispatch(action) : transitionTo(action)));

  if (_.isEmpty(actionsAfter)) {
    transitionTo(path);
  }

  if (store.getState().router.location.pathname !== location.pathname) {
    // we have to rerender it after we apply new path
    holder = mount(cmpn(props), store, history);
  }

  const state = store.getState();
  const router = getRouter(state);
  return { holder, router, state, store };
};

export const reduxTestSequence = (cmpn, steps = [], newStore?: boolean) => async () => {
  if (!steps.some(_.isFunction)) {
    expect('').toBe(`You have to pass test functions to the list of steps when
        using reduxTestSetup`);
    return;
  }
  let router;
  let holder;
  const storeToUse = newStore ? _createStore().store : store;
  const historyToUse = newStore ? _createStore().history : history;
  /* eslint-disable no-return-assign */
  const render = () => {
    holder = mount(cmpn(), storeToUse, historyToUse);
    router = getRouter(storeToUse.getState());
  };
  /* eslint-disable babel/no-await-in-loop */
  for (const step of steps) {
    switch (typeof step) {
      case 'function':
        if (!step.immediately) {
          render();
        }
        await step({
          holder,
          router,
          state: storeToUse.getState(),
          store: storeToUse,
        });
        break;
      case 'object':
        storeToUse.dispatch(step);
        break;
      case 'string':
        if (!router) {
          render();
        }
        transitionTo(step);
        break;
      default:
    }
  }
};

reduxTestSequence.immediately = fn => {
  fn.immediately = true;
  return fn;
};
