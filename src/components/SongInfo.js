import styles from "../components/Detail.module.css";
import "animate.css";

function SongInfo({ rank, name, peak, lastWeek, weeksOnChart }) {
  return (
    <div>
      <div>
        <h1
          className={`${rank >= 4 ? styles.SongRank : ""}${
            rank == 1 ? styles.SongRank1 : ""
          }${rank == 2 ? styles.SongRank2 : ""}${
            rank == 3 ? styles.SongRank3 : ""
          }`} // false일 시 null을 작성해 버리면 className 자체에 null이 들어가게 된다. 따라서 ""을 넣어줌
        >
          ⭐ rank {rank} ⭐
        </h1>
        <h1 className={styles.SongName}>{name}</h1>
      </div>
      <ul className={styles.RankInfo}>
        <li class="animate__animated animate__bounce">
          📶 Peak Rank of Song : <p>{peak != null ? peak : "-"}</p>
        </li>
        <li class="animate__animated animate__bounce">
          📶 Last Week Rank of Song : <p>{lastWeek != null ? lastWeek : "-"}</p>
        </li>
        <li class="animate__animated animate__bounce">
          📶 Weeks on Chart of Song :{" "}
          <p>{weeksOnChart != null ? weeksOnChart : "-"}</p>
        </li>
      </ul>
    </div>
  );
}

export default SongInfo;
