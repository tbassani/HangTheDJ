import React, {useEffect, useRef, useCallback} from 'react';
import {SafeAreaView, StyleSheet, AppState} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import {getDataFromStorage, saveDataToStorage} from '../../services/storage';
import {updateQueueService} from '../../services/mix';
import BackgroundFetch from 'react-native-background-fetch';

const ScreenWrapper = props => {
  const appState = useRef(AppState.currentState);

  const isPlaying = useSelector(state => state.mix.isPlaying);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!isPlaying) {
  //     BackgroundFetch.stop();
  //     clearInterval(playbackInterval.current);
  //     playbackInterval.current = undefined;
  //   } else {
  //     //BackgroundFetch.start();

  //     if (!playbackInterval.current) {
  //       console.log('No current interval');
  //       playbackInterval.current = setInterval(() => {
  //         console.log('updateQueue');
  //         updateQueueService(mixId);
  //       }, 900000);
  //     }
  //   }
  //   saveDataToStorage('isPlaying', isPlaying ? 'true' : 'false');
  //   return () => {
  //     playbackInterval.current = undefined;
  //     clearInterval(playbackInterval.current);
  //   };
  // }, [isPlaying]);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      console.log('remove event listener');
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [isPlaying]);

  const _handleAppStateChange = useCallback(
    nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        getDataFromStorage('mixId').then(currMixId => {
          getDataFromStorage('ownerId').then(mixOwnerId => {
            getDataFromStorage('mixTitle').then(mixTitle => {
              getDataFromStorage('isPlaying').then(currPlaying => {
                if (currMixId && mixOwnerId && mixTitle) {
                  dispatch(
                    actions.initGetMix(
                      parseInt(currMixId),
                      mixTitle,
                      parseInt(mixOwnerId),
                    ),
                  );
                  dispatch(actions.initGetTopTracks(parseInt(currMixId)));
                  if (currPlaying === 'true') {
                    console.log('isPlaying');
                    dispatch(actions.playTrack());
                  } else {
                    dispatch(actions.pauseTrack());
                  }
                  try {
                    props.navigation.navigate('RankingNavigator', {
                      screen: 'MixScreen',
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }
              });
            });
          });
        });
      } else {
        console.log('Background from wrapper');
        console.log(isPlaying);
        saveDataToStorage('isPlaying', isPlaying ? 'true' : 'false');
        BackgroundFetch.stop();
        if (isPlaying) {
          console.log('Start background fetch!');
          BackgroundFetch.start();
        }
      }

      appState.current = nextAppState;
      //console.log('AppState', appState.current);
    },
    [isPlaying],
  );

  return (
    <SafeAreaView style={{...styles.wrapperContainer, ...props.style}}>
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
  },
});

export default ScreenWrapper;
