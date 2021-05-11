const APIConfig = {
  LOGIN_URL: 'https://hdj-server.herokuapp.com/user/login',
  SIGNUP_URL: 'https://hdj-server.herokuapp.com/user/signup',
  REGISTER_URL: 'https://hdj-server.herokuapp.com/user/register',
  FORGOT_PASSWORD_URL: 'https://hdj-server.herokuapp.com/user/forgot_password',
  RESET_PASSWORD_URL: 'https://hdj-server.herokuapp.com/user/reset_password',
  ACTIVE_PROFILE_URL: 'https://hdj-server.herokuapp.com/user/profile',
  GET_PROFILE_URL: 'https://hdj-server.herokuapp.com/spotify/login',
  GET_PLAYLISTS_URL: 'https://hdj-server.herokuapp.com/spotify/playlists',
  CREATE_HDJPLAYLIST_URL: 'https://hdj-server.herokuapp.com/playlist/create',
  MIX_HDJPLAYLIST_URL: 'https://hdj-server.herokuapp.com/playlist/mix',
  GET_HDJPLAYLISTS_URL: 'https://hdj-server.herokuapp.com/playlists',
  DEL_HDJPLAYLIST_URL: 'https://hdj-server.herokuapp.com/playlists/delete',
  GET_HDJTRACKS_URL: 'https://hdj-server.herokuapp.com/playlists/tracks',
  GET_VOTING_TRACK_URL:
    'https://hdj-server.herokuapp.com/playlists/track/unvoted',
  UPVOTE_TRACK_URL: 'https://hdj-server.herokuapp.com/track/upvote',
  DOWNVOTE_TRACK_URL: 'https://hdj-server.herokuapp.com/track/downvote',
  ADD_TRACKS_URL: 'https://hdj-server.herokuapp.com/playlist/add',
  GET_PLAYING_TRACK_URL:
    'https://hdj-server.herokuapp.com/spotify/playing_track',
  GET_NEXT_TRACK_URL:
    'https://hdj-server.herokuapp.com/playlists/track/unplayed',
  PLAY_TRACK_URL: 'https://hdj-server.herokuapp.com/spotify/track/play',
  PAUSE_TRACK_URL: 'https://hdj-server.herokuapp.com/spotify/track/pause',
  GET_PLAYBACK_STATE_URL:
    'https://hdj-server.herokuapp.com/spotify/playback_state',
  RESET_HDJPLAYLIST_URL: 'https://hdj-server.herokuapp.com/playlists/reset',
  ADD_TO_GROUP_URL: 'https://hdj-server.herokuapp.com/playlists/group/add',
  GET_PLAYLISTS_AND_TRACKS_URL:
    'https://hdj-server.herokuapp.com/spotify/search',
  GET_TRACK_TO_VOTE_URL:
    'https://hdj-server.herokuapp.com/playlists/track/if_voted',
  SEARCH_VOTING_TRACKS_URL:
    'https://hdj-server.herokuapp.com/playlists/search_tracks',
  PREMIUM_CLICK_URL: 'https://hdj-server.herokuapp.com/premium/click',
};

export default APIConfig;
