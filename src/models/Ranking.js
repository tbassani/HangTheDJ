class Ranking {
  constructor(
    mixId,
    mixTitle,
    ownerId,
    tracks,
    topTracks,
    currTrack,
    timeInterval,
  ) {
    this.mixId = mixId;
    this.mixTitle = mixTitle;
    this.ownerId = ownerId;
    this.tracks = tracks;
    this.topTracks = topTracks;
    this.currTrack = currTrack;
    this.timeInterval = timeInterval;
  }
}

export default Ranking;
