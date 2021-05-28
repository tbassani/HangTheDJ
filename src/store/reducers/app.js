import * as actionTypes from '../actions/actionTypes';

const initialState = {
  mixes: null,
  playlists: [],
  tracks: [],
  newMix: {
    title: '',
    tracks: [],
    playlists: [],
  },
  refresh: false,
  profile: '',
  profileURL: '',
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_GET_MIXES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.GET_MIXES:
      return {
        ...state,
        mixes: action.mixes,
        loading: false,
        error: false,
      };
    case actionTypes.GET_MIXES_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.START_ADD_TO_GROUP:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.ADD_TO_GROUP:
      return {
        ...state,
        mixes: state.mixes.concat(action.mix),
        loading: false,
        error: false,
      };
    case actionTypes.ADD_TO_GROUP_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.START_GET_PROFILE_URL:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.GET_PROFILE_URL:
      return {
        ...state,
        profileURL: action.url,
        loading: false,
        error: false,
      };
    case actionTypes.GET_PROFILE_URL_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.START_GET_PROFILE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.GET_PROFILE:
      return {
        ...state,
        refresh: true,
        profile: action.profile,
        loading: false,
        error: false,
      };
    case actionTypes.GET_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.START_GET_TRACKS_AND_PLAYLISTS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.GET_TRACKS_AND_PLAYLISTS:
      return {
        ...state,
        tracks: action.tracks,
        playlists: action.playlists,
        loading: false,
        error: false,
      };
    case actionTypes.GET_TRACKS_AND_PLAYLISTS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.ADD_TRACK_TO_MIX:
      const newTracks = [...state.newMix.tracks];
      let trackExists = [];
      trackExists = newTracks.filter(track => track.id === action.track.id);
      if (trackExists.length <= 0) {
        newTracks.push(action.track);
      }

      return {
        ...state,
        newMix: {
          ...state.newMix,
          tracks: newTracks,
        },
      };
    case actionTypes.ADD_PLAYLIST_TO_MIX:
      const newPlaylists = [...state.newMix.playlists];
      let playlistExists = [];
      playlistExists = newPlaylists.filter(
        playlist => playlist.id === action.playlist.id,
      );
      if (playlistExists.length <= 0) {
        newPlaylists.push(action.playlist);
      }

      return {
        ...state,
        newMix: {
          ...state.newMix,
          playlists: newPlaylists,
        },
      };
    case actionTypes.REMOVE_TRACK_FROM_MIX:
      const updatedTracks = [...state.newMix.tracks].filter(
        track => track.id !== action.track.id,
      );

      return {
        ...state,
        newMix: {
          ...state.newMix,
          tracks: updatedTracks,
        },
      };
    case actionTypes.REMOVE_PLAYLIST_FROM_MIX:
      const updatedPlaylists = [...state.newMix.playlists].filter(
        playlist => playlist.id !== action.playlist.id,
      );

      return {
        ...state,
        newMix: {
          ...state.newMix,
          playlists: updatedPlaylists,
        },
      };
    case actionTypes.START_CREATE_MIX:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CREATE_MIX:
      return {
        ...state,
        newMix: {
          title: '',
          tracks: [],
          playlists: [],
        },
        tracks: [],
        playlists: [],
        loading: false,
      };
    case actionTypes.CREATE_MIX_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.START_REMOVE_MIX:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.REMOVE_MIX:
      const updatedMixes = [...state.mixes].filter(
        mix => mix.id !== action.mixId,
      );
      return {
        ...state,
        mixes: updatedMixes,
        loading: false,
      };
    case actionTypes.REMOVE_MIX_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.ADD_TRACKS_TO_MIX:
      return {
        ...state,
        newMix: {
          title: '',
          tracks: [],
          playlists: [],
        },
        tracks: [],
        playlists: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
