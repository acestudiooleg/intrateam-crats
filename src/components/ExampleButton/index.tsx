import React, { ReactNode } from 'react';
import { Button } from 'reactstrap';

interface IProps {
  onClick?: () => void;
  children: ReactNode;
  color: string;
}

export default ({ children, color, onClick }: IProps) => (
  <Button onClick={onClick} color={color}>
Hello
    {children}
  </Button>
);
