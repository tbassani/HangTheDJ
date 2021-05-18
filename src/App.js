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
import rankingReducer from './store/reducers/ranking';

import {watchAuth, watchApp, watchRanking} from './store/sagas';

import MainNavigator from './navigation/MainNavigation';

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  ranking: rankingReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchApp);
sagaMiddleware.run(watchRanking);

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
