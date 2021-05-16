import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../store/actions';

import Input from '../components/UI/Input';
import PrimaryButton from '../components/UI/PrimaryButton';
import PlaylistItem from '../components/playlist/PlaylistItem';
import TrackItem from '../components/track/TrackItem';

import Track from '../models/Track';
import Playlist from '../models/Playlist';

import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';

const YourMix = props => {
  const newMix = useSelector(currState => currState.app.newMix);

  const dispatch = useDispatch();

  const removeTrackHandler = track => {
    console.log(track);
    dispatch(actions.removeTrackFromMix(track));
  };

  const removePlaylistHandler = playlist => {
    dispatch(actions.removePlaylistFromMix(playlist));
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.listContainer}>
        <ScrollView>
          {newMix.tracks.length > 0 ? (
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>- MÚSICAS -</Text>
            </View>
          ) : null}
          {newMix.tracks.map(item => {
            return (
              <TrackItem
                key={item.id}
                imgSource={item.artURL}
                title={item.title}
                artists={item.artists}
                onSelectTrack={() => {}}
                onRemoveTrack={() => removeTrackHandler(item)}
              />
            );
          })}
          {newMix.playlists.length > 0 ? (
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>- PLAYLISTS -</Text>
            </View>
          ) : null}

          {newMix.playlists.map(item => {
            return (
              <PlaylistItem
                key={item.id}
                imgSource={item.artURL}
                title={item.title}
                onSelectPlaylist={() => {}}
                onRemovePLaylist={() => removePlaylistHandler(item)}
              />
            );
          })}
        </ScrollView>
        <PrimaryButton>Mixar!</PrimaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: Sizes.min,
  },
  listContainer: {
    flex: 1,
  },
  sectionTitle: {
    color: Colors.textDefault,
    fontSize: Sizes.huge,
  },
  sectionTitleContainer: {
    alignItems: 'center',
  },
});
export default YourMix;
