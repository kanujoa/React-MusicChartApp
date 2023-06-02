import styles from "../components/Detail.module.css";
import profile from "../profile.png";

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
    <div className={styles.SecondBlock}>
      <h1 className={styles.Title}>Artist Info</h1>
      {image === undefined ? <img src={profile} /> : <img src={image} />}
      {inArtist100 ? (
        <div>
          <h1 className={styles.ArtistName}>{artist}</h1>
          <ul className={styles.ArtistInfo}>
            <li>Artist's Rank : {rank}</li>
            <li>Artist's Peak Rank : {peak}</li>
            <li>Artist's Last Week Rank : {lastWeek}</li>
            <li>Artist's Weeks on Chart : {weeksOnChart}</li>
          </ul>
        </div>
      ) : (
        <h3 className={styles.NotinChart}>
          {artist} is not in billboard-artist-100 chart now.
        </h3>
      )}
    </div>
  );
}

export default ArtistInfo;
