import { createStore } from 'redux';
import rootReducer from '../reducers';

const environment: any = window || this;
const { hot } = module as any;
declare const ON_DEV: boolean; // from webpack

function reduxStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    environment.devToolsExtension && environment.devToolsExtension());

  if (ON_DEV && hot) {
    // Enable Webpack hot module replacement for reducers
    hot.accept('../reducers', () => {
      // We need to require for hot reloading to work properly.
      // tslint:disable-next-line:no-require-imports
      const nextReducer = require('../reducers');

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export default reduxStore;
