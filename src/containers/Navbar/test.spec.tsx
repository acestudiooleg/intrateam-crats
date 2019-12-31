/* eslint-disable react/display-name */
import React from 'react';
import Navbar from './index';
import { reduxTestSequence } from '../../utils/redux-test';
import { authorize } from '../../actions/auth';

const setup = () => <Navbar />;

const loginButtonExist = ({ holder }) => {
  const loginLink = holder.find('form a');
  expect(loginLink.length).toBeTruthy();
  expect(loginLink.text()).toBe('Login');
};

const logoutButtonExists = ({ holder }) => {
  const loginLink = holder.find('form a');
  const logoutButton = holder.find('form button');
  expect(loginLink.length).not.toBeTruthy();
  expect(logoutButton.length).toBeTruthy();
  expect(logoutButton.text()).toBe('Logout');
};
const clickToLogout = ({ holder }) => holder.find('form button').simulate('click');

test(
  'Navbar should change Login button to Logout of after authorizations and back',
  reduxTestSequence(setup, [
    loginButtonExist,
    authorize({ token: 'sdsd' }),
    logoutButtonExists,
    clickToLogout,
    loginButtonExist,
  ]),
);
