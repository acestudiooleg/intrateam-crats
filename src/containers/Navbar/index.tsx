import * as React from 'react';
import { Link } from 'react-router-dom';
import { AnyAction } from 'redux';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Navbar as NavbarBS, Collapse, Form, Nav, NavItem, Button } from 'reactstrap';

import authActions from '../../actions/auth';
import { IAuthState, getAuth } from '../../reducers/auth';

const Navbar = (): React.ReactElement => {
  const auth: IAuthState = useSelector(getAuth, shallowEqual);
  const dispatch = useDispatch();
  const logout = (): AnyAction => dispatch(authActions.unauthorize());

  return (
    <NavbarBS color="light" light expand="md">
      <Link className="navbar-brand" to="/">
        IntraTeam
      </Link>
      <Collapse isOpen navbar>
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
            Login
          </Link>
        )}
      </Form>
    </NavbarBS>
  );
};

export default Navbar;
