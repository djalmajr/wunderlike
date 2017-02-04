import invariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';
import localforage from 'localforage';
import { merge, throttle } from 'lodash';
import { applyMiddleware, createStore, compose } from 'redux';
import { middleware, outerReducer } from 'redux-async-initial-state';
import { Cache, DEVELOPMENT } from '~/constants';
import reducers from './reducers';
import rootSaga from './sagas';

const loadState = currentState => new Promise((resolve) => {
  localforage.getItem(Cache.KEY, (err, state = {}) => {
    if (err) {
      console.log(err); // eslint-disable-line
    }

    return resolve(merge({}, currentState, state));
  });
});

const saveState = (state) => {
  localforage.setItem(Cache.KEY, state);
};

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  let middlewares = [sagaMiddleware, middleware(loadState)];

  if (DEVELOPMENT) {
    const { DevTools } = require('../devtools'); // eslint-disable-line
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

    middlewares = middlewares.concat([invariant()]);
    middlewares = applyMiddleware(...middlewares);
    middlewares = composeEnhancers ?
      composeEnhancers(middlewares) :
      compose(middlewares, DevTools.instrument());
  } else {
    middlewares = applyMiddleware(...middlewares);
  }

  const store = createStore(outerReducer(reducers), middlewares);

  store.runSaga = sagaMiddleware.run;

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;

      store.replaceReducer(outerReducer(nextReducer));
    });
  }

  store.subscribe(throttle(() => {
    const { cacheMessage } = store.getState();

    saveState({ cacheMessage });
  }, 2000));

  store.runSaga(rootSaga);

  return store;
};

export default configureStore;
