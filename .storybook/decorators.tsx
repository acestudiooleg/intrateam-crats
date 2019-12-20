import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from '../src/constants';

export const Router = (fn: () => any) => <BrowserRouter basename={process.env.REACT_APP_BASENAME || Routes.Dashboard}>{fn()}</BrowserRouter>;
