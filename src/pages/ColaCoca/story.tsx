// @ts-nocheck
// https://storybook.js.org/docs/basics/writing-stories/

import React from 'react';
// import { action } from '@storybook/addon-actions';
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
// import { text, boolean, number, select, radios } from '@storybook/addon-knobs';

import ColaCoca from './index';

export default {
  title: 'containers/ColaCoca',
};

export const Idle = () => {
  return <ColaCoca />;
};
