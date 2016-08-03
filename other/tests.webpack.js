require('d3');
require('jquery');
require('lodash');
require('angular');
require('angular-animate');
require('angular-ui-router');
require('angular-mocks');
const context = require.context('../src', true, /\.spec\.js$/);
context.keys().forEach(context);