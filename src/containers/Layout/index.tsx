import * as React from 'react';
import Navbar from '../Navbar';

export interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps): React.ReactElement => (
  <div>
    <Navbar />
    {children}
  </div>
);

export default Layout;
