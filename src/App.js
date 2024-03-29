/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';

import BackgroundFetch from 'react-native-background-fetch';

import SplashScreen from 'react-native-splash-screen';

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

const icon = require('./assets/icon.png');

const App = () => {
  useEffect(() => {
    BackgroundFetch.stop();
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
