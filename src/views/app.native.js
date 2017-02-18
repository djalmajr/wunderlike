import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from '../store/configure-store';
import Todos from './containers/todos';

Text.defaultProps.allowFontScaling = false;

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Todos />
  </Provider>
);

export default App;
