import * as React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import authActions from '../../actions/auth';
import { IAuthState, getAuth } from '../../reducers/auth';

import {
  Navbar as NavbarBS,
  Collapse,
  Form,
  Nav,
  NavItem,
  Button,
} from 'reactstrap';

const Navbar = () => {
  const auth: IAuthState = useSelector(getAuth, shallowEqual);
  const dispatch = useDispatch();

  const logout = () => dispatch(authActions.logout());
  return (
    <NavbarBS color="light" light expand="md">
      <Link className="navbar-brand" to="/">
        IntraTeam
      </Link>
      <Collapse isOpen={true} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link className="nav-link" to="/settings">
              Settings
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
      <Form>
        {auth.authorized ? (
          <Button onClick={logout} color="primary">
            Logout
          </Button>
        ) : (
          <Link className="btn btn-primary" to="/login">
            {' '}
            Login
          </Link>
        )}
      </Form>
    </NavbarBS>
  );
};

export default Navbar;
