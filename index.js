/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import BackgroundFetch from 'react-native-background-fetch';
import MusicControl from 'react-native-music-control';

import {getDataFromStorage} from './src/services/storage';
import {updateQueueService} from './src/services/mix';

const icon = require('./src/assets/icon.png');

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
    if (currMixId && currUserId && mixOwnerId && currUserId === mixOwnerId) {
      MusicControl.setNowPlaying({
        title: 'Hang the DJ',
        artwork: icon, // URL or RN's image require()
      });
      if (isPlaying === 'true') {
        console.log('Called updatedQueue from background fetch');
        await updateQueueService(parseInt(currMixId));
      }
    }
    BackgroundFetch.finish(taskId);
  },
  async taskId => {
    // <-- Task timeout callback
    // This task has exceeded its allowed running-time.
    // You must stop what you're doing and immediately .finish(taskId)
    BackgroundFetch.finish(taskId);
  },
);

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
