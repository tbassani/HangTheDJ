class MixTrack {
  constructor(
    id,
    externalId,
    mixId,
    userId,
    title,
    artists,
    albumName,
    artURL,
    genre,
    score,
    wasPlayed,
    duration,
  ) {
    this.id = id;
    this.externalId = externalId;
    this.mixId = mixId;
    this.userId = userId;
    this.title = title;
    this.artists = artists;
    this.albumName = albumName;
    this.artURL = artURL;
    this.genre = genre;
    this.score = score;
    this.wasPlayed = wasPlayed;
    this.duration = duration;
  }
}

export default MixTrack;
