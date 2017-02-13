import './styles/typebase.css';
import reducers from './store/reducers';

import * as angular from 'angular';
import CommonComponents from './components/index.ts';
import CommonServices from './services/index.ts';
import CommonFilters from './filters/index.ts';

const ngModule = angular.module('da.common', [
  CommonComponents.name,
  CommonFilters.name,
  CommonServices.name
]);

export default ngModule;
