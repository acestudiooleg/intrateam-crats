import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { Routes } from '../../constants';
import { IAuthState, getAuth } from '../../reducers/auth';
import authActions from '../../actions/auth';

export default ({ children, ...rest }: RouteProps) => {
  const auth: IAuthState = useSelector(getAuth, shallowEqual);
  const dispatch = useDispatch();

  if (!auth.authorized) {
    dispatch(authActions.logout());
    return <Redirect to={Routes.Login} />;
  }
  return <Route {...rest}>{children}</Route>;
};
