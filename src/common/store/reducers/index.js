import { combineReducers } from 'redux';

const reducers = require.context('./', true, /\.reducer\.js$/);
const rootReducer = combineReducers(Object.assign({}, ...reducers.keys().map(reducers)));

export default rootReducer;
