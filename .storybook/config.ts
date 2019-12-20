import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { Router } from './decorators';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/App.scss';


addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator(Router);

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /story\.tsx$/), module);
