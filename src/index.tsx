import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/app.container';
import configureStore from './stores/configure-store';

const store = configureStore();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('app'),
  );
};

render(App);
