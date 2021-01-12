import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import persistState from 'redux-localstorage';
import { createMiddleware } from 'redux-api-middleware';

import { rootReducer } from './rootReducer';
import RootSaga from './saga';

const sagaMiddleware = createSagaMiddleware({ context: {} });

export function configureStore(storeConfig) {
  const middlewares = [thunk, createMiddleware, sagaMiddleware];
  if (storeConfig.reduxLog) {
    middlewares.push(createLogger());
  }

  const enhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    persistState(['featureToggle', 'settings'], { key: 'redux' })
  );

  const store = createStore(rootReducer, /* preloadedState, */ enhancer);
  store.dispatch({ type: 'STORE_INIT' });

  sagaMiddleware.run(RootSaga);

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      /* eslint-disable-next-line global-require, @typescript-eslint/no-var-requires */
      store.replaceReducer(require('./rootReducer').rootReducer);
    });
  }

  return store;
}
