import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';

import App from './app';

render(<App />, document.getElementById('root'));
