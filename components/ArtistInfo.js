function ArtistInfo({
  image,
  artist,
  rank,
  peak,
  lastWeek,
  weeksOnChart,
  inArtist100,
}) {
  return (
    <div>
      <div>
        <h1>Artist's Info</h1>
        {image === undefined ? null : <img src={image} />}
        <h1>{artist}</h1>
      </div>
      {inArtist100 ? (
        <ul>
          <li>Artist's Rank : {rank}</li>
          <li>Artist's Peak Rank : {peak}</li>
          <li>Artist's Last Week Rank : {lastWeek}</li>
          <li>Artist's Weeks on Chart : {weeksOnChart}</li>
        </ul>
      ) : (
        <h3>This artist is not in billboard-artist-100 chart now.</h3>
      )}
    </div>
  );
}

export default ArtistInfo;
