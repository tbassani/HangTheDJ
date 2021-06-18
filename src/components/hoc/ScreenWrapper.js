import React, {useEffect, useRef} from 'react';
import {SafeAreaView, StyleSheet, AppState} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import {getDataFromStorage} from '../../services/storage';

const ScreenWrapper = props => {
  const appState = useRef(AppState.currentState);
  const dispatch = useDispatch();
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      getDataFromStorage('mixId').then(currMixId => {
        getDataFromStorage('ownerId').then(mixOwnerId => {
          if (currMixId && mixOwnerId) {
            dispatch(actions.initGetMix(currMixId, mixOwnerId));
            dispatch(actions.initGetTopTracks(currMixId));
          }
        });
      });
    }

    appState.current = nextAppState;
  };

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
