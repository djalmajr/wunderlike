import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// import configureStore from './store/configure-store';
import App from './src/app';

const rootEl = document.querySelector('#__wrapper__');
// const store = configureStore();

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./src/app', () => {
    const NextApp = require('./src/app').default;

    render(NextApp);
  });
}
