import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '~/store/configure-store';
import Todos from './containers/todos';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Todos />
  </Provider>
);

export default App;
