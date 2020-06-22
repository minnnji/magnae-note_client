import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/index';

const middleware = [];
const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'meeting'
  ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
  middleware.push(thunk);
}

const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
);

export default store;
