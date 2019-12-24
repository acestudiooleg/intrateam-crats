import React, { ReactNode, ReactElement } from 'react';
import { Button } from 'reactstrap';

interface IProps {
  onClick?: () => void;
  children: ReactNode;
  color: string;
}

const ExampleButton = ({ children, color, onClick }: IProps): ReactElement => (
  <Button onClick={onClick} color={color}>
    Hello
    {children}
  </Button>
);

export default ExampleButton;
