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

import {getDataFromStorage} from './services/storage';
import {updateQueueService} from './services/mix';
import BackgroundFetch from 'react-native-background-fetch';
import MusicControl from 'react-native-music-control';

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
  const initBackgroundFetch = async () => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        //forceAlarmManager: true,
      },
      async taskId => {
        console.log('Execute background fetch');
        const currMixId = await getDataFromStorage('mixId');
        const currUserId = await getDataFromStorage('userId');
        const mixOwnerId = await getDataFromStorage('ownerId');
        const isPlaying = await getDataFromStorage('isPlaying');
        if (
          currMixId &&
          currUserId &&
          mixOwnerId &&
          currUserId === mixOwnerId
        ) {
          MusicControl.setNowPlaying({
            title: 'Hang the DJ',
            artwork: icon, // URL or RN's image require()
          });
          if (isPlaying === 'true') {
            console.log('Called updatedQueue from background fetch');
            updateQueueService(parseInt(currMixId));
          }
        }
      },
      async taskId => {
        // <-- Task timeout callback
        // This task has exceeded its allowed running-time.
        // You must stop what you're doing and immediately .finish(taskId)
        BackgroundFetch.finish(taskId);
      },
    );
  };
  useEffect(() => {
    const startService = async () => {
      console.log('START');
      await initBackgroundFetch();
      BackgroundFetch.stop();
    };
    startService();
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
