import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import invariant from 'redux-immutable-state-invariant';
import { DEVELOPMENT } from '../constants';
import reducers from './reducers';
import rootSaga from './sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  let middlewares = [sagaMiddleware];

  if (DEVELOPMENT) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

    middlewares = applyMiddleware(...middlewares.concat([invariant()]));
    middlewares = composeEnhancers ? composeEnhancers(middlewares) : compose(middlewares);
  } else {
    middlewares = applyMiddleware(...middlewares);
  }

  const store = createStore(reducers, middlewares);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;

      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
