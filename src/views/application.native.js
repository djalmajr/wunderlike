import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from '../store/configure-store';
import { DEVELOPMENT } from '../constants';
import Navigator from './navigator';

Text.defaultProps.allowFontScaling = false;

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

if (DEVELOPMENT) {
  window.Perf = require('react-addons-perf');
}

export default App;
