import React, {useEffect, useRef, useCallback} from 'react';
import {SafeAreaView, StyleSheet, AppState} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import {getDataFromStorage, saveDataToStorage} from '../../services/storage';
import {updateQueueService} from '../../services/mix';

import BackgroundFetch from 'react-native-background-fetch';

const ScreenWrapper = props => {
  const appState = useRef(AppState.currentState);
  const backgroundFetch = useRef(false);
  const foregroundFetch = useRef(false);

  const isPlaying = useSelector(state => state.mix.isPlaying);

  const dispatch = useDispatch();

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
        getDataFromStorage('userId').then(userId => {
          getDataFromStorage('mixId').then(currMixId => {
            getDataFromStorage('ownerId').then(mixOwnerId => {
              getDataFromStorage('mixTitle').then(mixTitle => {
                getDataFromStorage('isPlaying').then(async currPlaying => {
                  if (currMixId && mixOwnerId && mixTitle) {
                    dispatch(
                      actions.initGetMix(
                        parseInt(currMixId),
                        mixTitle,
                        parseInt(mixOwnerId),
                      ),
                    );
                    if (userId === mixOwnerId) {
                      if (currPlaying === 'true') {
                        if (!foregroundFetch.current) {
                          console.log('UPDATE QUEUE FROM FOREGROUND');
                          foregroundFetch.current = true;
                          await updateQueueService(currMixId);
                        }
                      }
                    }
                    dispatch(actions.initGetTopTracks(parseInt(currMixId)));
                    try {
                      props.navigation.navigate('RankingNavigator', {
                        screen: 'MixScreen',
                      });
                    } catch (error) {
                      console.log(error);
                    }
                    backgroundFetch.current = false;
                  }
                });
              });
            });
          });
        });
      } else if (nextAppState === 'background') {
        console.log('Background from wrapper: ' + nextAppState);
        saveDataToStorage('isPlaying', isPlaying ? 'true' : 'false');
        BackgroundFetch.stop();
        if (isPlaying) {
          if (!backgroundFetch.current) {
            console.log('Start background fetch!');
            BackgroundFetch.start();
            backgroundFetch.current = true;
          }
        }
        foregroundFetch.current = false;
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
