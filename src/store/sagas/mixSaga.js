import {put, select} from 'redux-saga/effects';

import * as actions from '../actions';

import MixTrack from '../../models/MixTrack';
import Mix from '../../models/Mix';

import MinMixDuration from '../../constants/MinMixDuration';

import {
  searchRankingTracksService,
  addTracksService,
  getNextTrackService,
  getPlayingTrackService,
  getVotingTrackService,
  getTrackToVoteService,
  upvoteService,
  downvoteService,
  pauseTrackService,
  playTrackService,
  resetPlaylistService,
  addTopTracksToQueueService,
  removeTracksFromQueueService,
  getTopTracksService,
  setTopTracksService,
} from '../../services/mix';
import {Alert} from 'react-native';

export function* initGetRankingTracksSaga(action) {
  yield put(actions.startGetRankingTracks());
  const response = yield searchRankingTracksService(
    action.mixId,
    action.query,
    action.cancelToken,
  );
  const rankingTracks = [];

  if (response && !response.error) {
    response.forEach(track => {
      rankingTracks.push(
        new MixTrack(
          track.id,
          track.external_track_id,
          track.playlist_id,
          track.user_id,
          track.track_name,
          track.artist_name,
          track.album_name,
          track.album_art,
          track.genre,
          track.score,
          track.was_played,
          track.duration,
        ),
      );
    });
    yield put(actions.getRankingTracks(rankingTracks));
  } else {
    if (response === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.getRankingTracksFail());
    }
  }
}
export function* initRemoveTopTracksSaga(action) {
  const ownerIdSelector = state => state.mix.ownerId;
  const ownerId = yield select(ownerIdSelector);
  console.log('Remove top tracks saga');
  if (ownerId === action.userId) {
    const response = yield removeTracksFromQueueService(action.userId);
    const pauseTrack = yield pauseTrackService();
    yield put(actions.removeTopTracks());
    if (response.error == 401) {
      yield put(actions.initLogout());
    } else if (response.error) {
      yield put(actions.removeTopTracksFail());
    }
  }
}

export function* initGetMixSaga(action) {
  yield put(actions.startGetMix());
  const response = yield searchRankingTracksService(
    action.mixId,
    '',
    undefined,
  );
  const rankingTracks = [];

  if (response && !response.error) {
    response.forEach(track => {
      rankingTracks.push(
        new MixTrack(
          track.id,
          track.external_track_id,
          track.playlist_id,
          track.user_id,
          track.track_name,
          track.artist_name,
          track.album_name,
          track.album_art,
          track.genre,
          track.score,
          track.was_played,
          track.duration,
        ),
      );
    });
    yield put(
      actions.getMix(
        new Mix(
          action.mixId,
          action.mixTitle,
          action.ownerId,
          rankingTracks,
          [],
          null,
          null,
        ),
      ),
    );
  } else {
    if (response.error === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.getMixFail());
    }
  }
}

export function* initGetTopTracksSaga(action) {
  console.log('Get Top Tracks Saga');

  yield put(actions.startGetTopTracks());

  const response = yield getTopTracksService(action.mixId);

  const rankingTracks = [];

  if (response && !response.error) {
    yield response.forEach(track => {
      rankingTracks.push(
        new MixTrack(
          track.id,
          track.external_track_id,
          track.playlist_id,
          track.user_id,
          track.track_name,
          track.artist_name,
          track.album_name,
          track.album_art,
          track.genre,
          track.score,
          track.was_played,
          track.duration,
        ),
      );
    });
    yield put(actions.setTopTracks(rankingTracks));
  } else {
    if (response.error === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.getTopTracksFail());
    }
  }
}

export function* initAddTracksToMixSaga(action) {
  yield put(actions.startAddTracksToMix());
  const newMixSelector = state => state.app.newMix;
  const mix = yield select(newMixSelector);
  const mixIdSelector = state => state.mix.mixId;
  const mixId = yield select(mixIdSelector);
  const mixTitleSelector = state => state.mix.mixTitle;
  const mixTitle = yield select(mixTitleSelector);
  const mixOwnerSelector = state => state.mix.ownerId;
  const ownerId = yield select(mixOwnerSelector);

  const selectedTracks = [];
  const selectedPlaylists = [];

  mix.tracks.forEach(track => {
    selectedTracks.push(track.id);
  });
  mix.playlists.forEach(playlist => {
    selectedPlaylists.push(playlist.id);
  });
  const response = yield addTracksService(
    selectedPlaylists,
    selectedTracks,
    mixId,
  );
  if (response && !response.error) {
    yield put(actions.addTracksToMix());
    yield put(actions.initGetMix(mixId, mixTitle, ownerId));
  } else {
    if (response.error === 401) {
      yield put(actions.initLogout());
    } else {
      Alert.alert('Ops! Ocorreu um erro!', 'Tente novamente mais tarde.');
      yield put(actions.resetPasswordFail());
    }
  }
}

export function* initGetCurrentTrackSaga(action) {
  const mixIdSelector = state => state.mix.mixId;
  const mixId = yield select(mixIdSelector);

  let validMixId = mixId ? mixId : action.mixId;

  //yield put(actions.initGetTopTracks(validMixId));

  const topTracksSelector = state => state.mix.topTracks;
  const topTracks = yield select(topTracksSelector);

  yield put(actions.startGetCurrentTrack());

  let playingTrack = yield getPlayingTrackService(validMixId);

  const isInTopTracks = topTracks.filter(
    track => track.externalId === playingTrack.external_track_id,
  );

  if (
    !playingTrack.external_track_id ||
    playingTrack.error === 404 ||
    playingTrack.error === 400
  ) {
    console.log('Not playing due to error.');
    playingTrack = yield getNextTrackService(validMixId);
  }
  if (!topTracks || topTracks.length <= 0) {
    console.log('No top tracks, get next');
    playingTrack = yield getNextTrackService(validMixId);
    yield put(actions.pauseTrack());
  } else {
    if (!playingTrack.is_playing && !playingTrack.error) {
      console.log('Not playing, no error');
      if (action.mixId) {
        console.log('Get next');
        playingTrack = yield getNextTrackService(action.mixId);
      }
      yield put(actions.pauseTrack());
    } else if (playingTrack.is_playing && !playingTrack.error) {
      if (isInTopTracks.length === 0) {
        playingTrack = yield getNextTrackService(action.mixId);
        yield put(actions.pauseTrack());
      } else {
        yield put(actions.playTrack());
      }
    } else {
      yield put(actions.pauseTrack());
    }
  }

  if (playingTrack.external_track_id && !playingTrack.error) {
    const track = yield new MixTrack(
      playingTrack.id,
      playingTrack.external_track_id,
      playingTrack.playlist_id,
      playingTrack.user_id,
      playingTrack.track_name,
      playingTrack.artist_name,
      playingTrack.album_name,
      playingTrack.album_art,
      playingTrack.genre,
      playingTrack.score,
      playingTrack.was_played,
      playingTrack.duration,
    );
    yield put(actions.getCurrentTrack(track));
  } else {
    if (playingTrack.error === 401) {
      yield put(actions.initLogout());
    } else if (playingTrack.error === 400) {
      Alert.alert('Ops! Ocorreu um erro!', 'Tente novamente mais tarde.');
      yield put(actions.getCurrentTrackFail());
    } else if (playingTrack.error === 404) {
      yield put(actions.getCurrentTrackFail());
    }
  }
}

export function* initGetVotingTrackSaga(action) {
  yield put(actions.startGetVotingTrack());
  const mixIdSelector = state => state.mix.mixId;
  const mixId = yield select(mixIdSelector);
  let response;
  if (!action.trackId) {
    response = yield getVotingTrackService(mixId);
  } else {
    let aux = yield getTrackToVoteService(action.trackId, mixId);
    response = aux[0];
  }

  if (response && !response.error) {
    const track = yield new MixTrack(
      response.id,
      response.external_track_id,
      response.playlist_id,
      response.user_id,
      response.track_name,
      response.artist_name,
      response.album_name,
      response.album_art,
      response.genre,
      response.score,
      response.was_played,
      response.duration,
    );
    yield put(actions.getVotingTrack(track));
  } else {
    if (response.error === 401) {
      yield put(actions.initLogout());
    } else {
      Alert.alert('Ops! Ocorreu um erro!', 'Tente novamente mais tarde.');
      yield put(actions.getVotingTrackFail());
    }
  }
}

export function* initUpvoteSaga(action) {
  yield put(actions.startUpvote());
  const mixIdSelector = state => state.mix.mixId;
  const mixId = yield select(mixIdSelector);
  let response = yield upvoteService(mixId, action.trackId);
  if (response && !response.error) {
    yield put(actions.upvote());
    yield put(actions.initGetVotingTrack());
  } else {
    if (response.error === 401) {
      yield put(actions.initLogout());
    } else {
      Alert.alert('Ops! Ocorreu um erro!', 'Tente novamente mais tarde.');
      yield put(actions.upvoteFail());
    }
  }
}

export function* initDownvoteSaga(action) {
  yield put(actions.startDownvote());
  const mixIdSelector = state => state.mix.mixId;
  const mixId = yield select(mixIdSelector);
  let response = yield downvoteService(mixId, action.trackId);
  if (response && !response.error) {
    yield put(actions.downvote());
    yield put(actions.initGetVotingTrack());
  } else {
    if (response.error === 401) {
      yield put(actions.initLogout());
    } else {
      Alert.alert('Ops! Ocorreu um erro!', 'Tente novamente mais tarde.');
      yield put(actions.upvoteFail());
    }
  }
}

const setNewTopTracks = (tracks, oldTopTracks, beginDuration, currentTrack) => {
  let newTopTracks = [...oldTopTracks];
  console.log('ADD TO QUEUE FROM PLAY');
  let duration = beginDuration;
  let i = 0;
  while (i < tracks.length && duration < MinMixDuration.duration) {
    //if (tracks[i].externalId !== currentTrack.externalId) {
    duration = duration + tracks[i].duration;
    console.log('ADD TO QUEUE: ' + i);
    newTopTracks.push(tracks[i]);
    //}
    i++;
  }
  return {
    newTopTracks,
    duration,
  };
};

export function* initBeginPlaybackSaga(action) {
  let tracksToQueue;
  yield put(actions.playTrack());
  yield put(actions.startBeginPlayback());

  const mixIdSelector = state => state.mix.mixId;
  const mixId = yield select(mixIdSelector);
  const mixTitleSelector = state => state.mix.mixTitle;
  const mixTitle = yield select(mixTitleSelector);
  const ownerIdSelector = state => state.mix.ownerId;
  const ownerId = yield select(ownerIdSelector);
  const currTrackSelector = state => state.mix.currentTrack;
  const currentTrack = yield select(currTrackSelector);

  yield put(actions.initGetMix(mixId, mixTitle, ownerId));
  //yield put(actions.initGetTopTracks(mixId));

  const tracksSelector = state => state.mix.tracks;
  const tracks = yield select(tracksSelector);
  const topTracksSelector = state => state.mix.topTracks;
  const topTracks = yield select(topTracksSelector);
  console.log(topTracks.length);
  //Check playback state
  if (action.pressedPlay) {
    const playTrack = yield playTrackService(mixId, currentTrack.externalId);
    if (playTrack.error === 404) {
      Alert.alert(
        'Ops! Ocorreu um erro!',
        'Verifique que seu streaming de música esta online e funcionando!',
      );
      yield put(actions.pauseTrack());
    } else if (playTrack.error === 400) {
      Alert.alert('Ops! Ocorreu um erro!', 'Tente novamente mais tarde.');
      yield put(actions.pauseTrack());
    } else {
      yield put(actions.playTrack());
      //const currTopTracks = yield getTopTracksService(mixId);
      console.log('TOP TRACKS');
      console.log(topTracks);
      if (!topTracks || topTracks.length <= 0) {
        console.log('NO TOP TRACKS, ADD CURR TRACK PLUS TOP');
        let updatedTopTracks = yield setNewTopTracks(
          tracks,
          [],
          0,
          currentTrack,
        );
        if (updatedTopTracks.duration < MinMixDuration.duration) {
          const resetMix = yield resetPlaylistService(mixId);
          yield put(actions.initGetMix(mixId, mixTitle, ownerId));
          const newTracks = yield select(tracksSelector);
          updatedTopTracks = yield setNewTopTracks(
            newTracks,
            [],
            updatedTopTracks.duration,
            currentTrack,
          );
        }
        tracksToQueue = yield addTopTracksToQueueService(
          updatedTopTracks.newTopTracks.filter(
            track => track.externalId !== currentTrack.externalId,
          ),
          mixId,
        );
        yield setTopTracksService(updatedTopTracks.newTopTracks, mixId);
        yield put(actions.setTopTracks(updatedTopTracks.newTopTracks));
      } else {
        console.log('SEGUNDO CLICK');
        const playingTrack = yield getPlayingTrackService(mixId);
        const topTracksCheck = topTracks.filter(track => {
          return track.externalId === playingTrack.external_track_id;
        });
        const index = topTracks.indexOf(topTracksCheck[0]);
        if (index > 0) {
          let minDuration = 0;
          let oldTracks = [];
          console.log('OLD TRACK INDEX: ' + index);
          for (let n = index + 1; n < topTracks.length; n++) {
            minDuration = minDuration + topTracks[n].duration;
            oldTracks.push(topTracks[n]);
            console.log(topTracks[n].title);
          }
          yield put(actions.initGetMix(mixId, mixTitle, ownerId));
          //recalculate topTracks
          const tracksSelector = state => state.mix.tracks;
          const updatedTracks = yield select(tracksSelector);
          let updatedTopTracks = yield setNewTopTracks(
            updatedTracks,
            [],
            minDuration,
            currentTrack,
          );
          if (updatedTopTracks.duration < MinMixDuration.duration) {
            console.log('NOT ENOUGH TRACKS');
            //reset playlist
            const resetMix = yield resetPlaylistService(mixId);
            //get ranking
            yield put(actions.initGetMix(mixId, mixTitle, ownerId));
            //recalculate topTracks
            const tracksSelector = state => state.mix.tracks;
            const newTracks = yield select(tracksSelector);
            updatedTopTracks = yield setNewTopTracks(
              newTracks,
              updatedTopTracks.newTopTracks,
              updatedTopTracks.duration,
              currentTrack,
            );
          }
          tracksToQueue = yield addTopTracksToQueueService(
            updatedTopTracks.newTopTracks.filter(
              track => track.externalId !== currentTrack.externalId,
            ),
            mixId,
          );
          yield setTopTracksService(
            [...oldTracks, ...updatedTopTracks.newTopTracks],
            mixId,
          );
          yield put(
            actions.setTopTracks([
              ...oldTracks,
              ...updatedTopTracks.newTopTracks,
            ]),
          );
        } else {
          //Is playing a song not in the Top Tracks
          yield put(actions.pauseTrack());
        }
      }
    }
  } else {
    //Get the newest ranking
    yield put(actions.initGetMix(mixId, mixTitle, ownerId));
    console.log('AUTOMATIC');
    const playingTrack = yield getPlayingTrackService(mixId);
    yield put(actions.initGetCurrentTrack());
    if (
      !playingTrack.is_playing &&
      playingTrack.progress_ms > 0 &&
      playingTrack.progress_ms < playingTrack.duration
      //If it is paused, stop de playback
    ) {
      console.log('PAUSED ON SPOTIFY');
      yield put(actions.pauseTrack());
    } else {
      const playingTrack = yield getPlayingTrackService(mixId);
      const topTracksCheck = topTracks.filter(track => {
        return track.externalId === playingTrack.external_track_id;
      });
      const index = topTracks.indexOf(topTracksCheck[0]);
      if (index > 0) {
        let minDuration = 0;
        let oldTracks = [];
        console.log('OLD TRACK INDEX: ' + index);
        for (let n = index + 1; n < topTracks.length; n++) {
          minDuration = minDuration + topTracks[n].duration;
          oldTracks.push(topTracks[n]);
          console.log(topTracks[n].title);
        }
        yield put(actions.initGetMix(mixId, mixTitle, ownerId));
        //recalculate topTracks
        const tracksSelector = state => state.mix.tracks;
        const updatedTracks = yield select(tracksSelector);
        let updatedTopTracks = yield setNewTopTracks(
          updatedTracks,
          [],
          minDuration,
          currentTrack,
        );
        if (updatedTopTracks.duration < MinMixDuration.duration) {
          console.log('NOT ENOUGH TRACKS');
          //reset playlist
          const resetMix = yield resetPlaylistService(mixId);
          //get ranking
          yield put(actions.initGetMix(mixId, mixTitle, ownerId));
          //recalculate topTracks
          const tracksSelector = state => state.mix.tracks;
          const newTracks = yield select(tracksSelector);
          updatedTopTracks = yield setNewTopTracks(
            newTracks,
            updatedTopTracks.newTopTracks,
            updatedTopTracks.duration,
            currentTrack,
          );
        }
        tracksToQueue = yield addTopTracksToQueueService(
          updatedTopTracks.newTopTracks.filter(
            track => track.externalId !== currentTrack.externalId,
          ),
          mixId,
        );
        yield setTopTracksService(
          [...oldTracks, ...updatedTopTracks.newTopTracks],
          mixId,
        );
        yield put(
          actions.setTopTracks([
            ...oldTracks,
            ...updatedTopTracks.newTopTracks,
          ]),
        );
      } else {
        //Is playing a song not in the Top Tracks
        yield put(actions.pauseTrack());
      }
    }
  }
  // console.log('SET CURR TRACK');
  // let currPlayingTrack = yield getPlayingTrackService(mixId);
  // console.log(currPlayingTrack);
  // yield put(
  //   actions.getCurrentTrack(
  //     new MixTrack(
  //       currPlayingTrack.id,
  //       currPlayingTrack.external_track_id,
  //       currPlayingTrack.playlist_id,
  //       currPlayingTrack.user_id,
  //       currPlayingTrack.track_name,
  //       currPlayingTrack.artist_name,
  //       currPlayingTrack.album_name,
  //       currPlayingTrack.album_art,
  //       currPlayingTrack.genre,
  //       currPlayingTrack.score,
  //       currPlayingTrack.was_played,
  //       currPlayingTrack.duration,
  //     ),
  //   ),
  // );

  //Check playback state
  //If it is paused, stop de playback
  //Check if topTracks is empty
  //If it is, then play currTrack and fill topTracks (exclude currTrack)
  //If it is not empty
  ////check is the music playing is in the topTracks
  ////If it is then most songs have probably been played already
  //////Add new topSongs and send them to the queue
  ////If it is not, stop the playback

  yield put(actions.beginPlayback());
}

export function* initStopPlaybackSaga(action) {
  yield put(actions.pauseTrack());
  yield put(actions.startStopPlayback());

  const pauseTrack = yield pauseTrackService();
  yield put(actions.pauseTrack());
}
