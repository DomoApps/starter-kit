require('babel-polyfill');
require('./styles/typebase.css');

import { attachAll } from '../../other/boilerplate-utils.js';
const ngModule = require('angular').module('da.common', []);

attachAll(require.context('./services', true, /\.factory\.js$/))(ngModule);
attachAll(require.context('./filters', true, /\.filter\.js$/))(ngModule);
attachAll(require.context('./components', true, /\.(component|directive)\.js$/))(ngModule);

export default ngModule;
