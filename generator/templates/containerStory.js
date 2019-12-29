module.exports = ({ Name }) => `// @ts-nocheck
// https://storybook.js.org/docs/basics/writing-stories/

import React from 'react';
// import { action } from '@storybook/addon-actions';
// https://github.com/storybookjs/storybook/tree/master/addons/knobs
// import { text, boolean, number, select, radios } from '@storybook/addon-knobs';

import ${Name} from './index';

export default {
  title: 'containers/${Name}',
};

export const Idle = () => {
  return <${Name} />;
};
`;
