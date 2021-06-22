/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import BackgroundFetch from 'react-native-background-fetch';

import {getDataFromStorage} from './src/services/storage';

// const MyHeadlessTask = async event => {
//   console.log('Receiving HeartBeat!');
//   let taskId = event.taskId;
//   const mixId = await getDataFromStorage('mixId');
//   const userId = await getDataFromStorage('userId');
//   const ownerId = await getDataFromStorage('ownerId');
//   /*if (mixId && userId && ownerId && userId === ownerId) {
//     setInterval(() => {
//       updateQueueService(mixId);
//     }, 900000);
//   }*/
//   BackgroundFetch.finish(taskId);
// };

// BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

AppRegistry.registerComponent(appName, () => App);
//AppRegistry.registerHeadlessTask('HangTheDJ', () => MyHeadlessTask);
