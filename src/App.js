/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';

import authReducer from './store/reducers/auth';
import appReducer from './store/reducers/app';
import mixReducer from './store/reducers/mix';

import {watchAuth, watchApp, watchMix} from './store/sagas';

import MainNavigator from './navigation/MainNavigation';

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  mix: mixReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchApp);
sagaMiddleware.run(watchMix);

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
