import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import codePush from 'react-native-code-push';
import configureStore from '../store/configure-store';
import Main from './main';

Text.defaultProps.allowFontScaling = false;

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default codePush(App);
