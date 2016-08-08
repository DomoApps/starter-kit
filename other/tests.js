const testFiles = require.context('../src', true, /\.spec\.js$/);
const ngModule = angular.module('da.test', []);
testFiles.keys().forEach(key => { testFiles(key)(ngModule); });
