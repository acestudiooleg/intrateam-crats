import * as React from 'react';
import Navbar from '../Navbar';

export interface ILayoutProps {
  children: React.ReactNode;
}

export default ({ children }: ILayoutProps) => (
  <div>
    <Navbar />
    {children}
  </div>
);
