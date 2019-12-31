/* eslint-disable react/display-name */
import React from 'react';
import ProtectedRoute from './index';
import { reduxSetup } from '../../utils/redux-test';
import { authorize } from '../../actions/auth';

const text = 'hello world';
const setup = reduxSetup(() => <ProtectedRoute path="/" component={() => <div>{text}</div>} />);

test('ProtectedRoute render component when authorized', () => {
  const actionsBeforeRender = [authorize({ token: 'hello' })];
  const { holder, state } = setup({}, actionsBeforeRender);
  expect(state.auth.authorized).toBeTruthy();
  expect(holder.text()).toBe(text);
  expect(holder.find('Redirect')).toBeDefined();
});

test('ProtectedRoute redirect to login page when not authorized', () => {
  const { holder, state } = setup();
  expect(state.auth.authorized).not.toBeTruthy();
  expect(holder.find('Redirect')).toBeDefined();
});
