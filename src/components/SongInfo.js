function SongInfo({ image, rank, name, peak, lastWeek, weeksOnChart }) {
  return (
    <div>
      <div>
        <h1>rank {rank}</h1>
        <h1>{name}</h1>
      </div>
      <ul>
        <li>Peak Rank of Song: {peak}</li>
        <li>Last Week Rank of Song: {lastWeek}</li>
        <li>Weeks on Chart of Song: {weeksOnChart}</li>
      </ul>
    </div>
  );
}

export default SongInfo;
