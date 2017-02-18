import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import invariant from 'redux-immutable-state-invariant';
import { DEVELOPMENT } from '../constants';
import reducers from './reducers';
import rootSaga from './sagas';

const configureStore = () => {
  const middlewares = [createSagaMiddleware()];

  if (DEVELOPMENT) {
    middlewares.push(invariant());
  }

  const store = createStore(reducers, applyMiddleware(...middlewares));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;

      store.replaceReducer(nextReducer);
    });
  }

  middlewares[0].run(rootSaga);

  return store;
};

export default configureStore;
