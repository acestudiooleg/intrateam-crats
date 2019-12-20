// https://storybook.js.org/docs/basics/writing-stories/

import React from 'react';
import { action } from '@storybook/addon-actions';
import { radios } from '@storybook/addon-knobs';
import Button from './index';

export default {
  title: 'Example Button',
};

const options = {
  green: 'success',
  blue: 'primary',
  yellow: 'warning',
  red: 'danger',
};


export const GreenButton = () => {
  const color = radios('Color', options, options.green);
  return <Button onClick={action('Click To Button')} color={color}>Green Button</Button>;
};
