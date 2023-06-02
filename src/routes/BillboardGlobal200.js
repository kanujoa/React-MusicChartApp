import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chart from "../components/Chart";
import styles from "../components/ChartList.module.css";
import styles2 from "../components/Loading.module.css";
import loadingImg from "../loading.png";

function BillboardGlobal200() {
  const chart = "billboard-global-200";
  // api 가져올 때 loading
  const [loading, setLoading] = useState(true);
  // 화면에 보여줄 곡 목록 설정
  const [songs, setSongs] = useState([]);
  // 기준 날짜 관리
  const [date, setDate] = useState("");
  // 마우스 커서가 컴포넌트(<Chart>, 정확히는 Chart의 부모 div)에 올라가 있는지 아닌지 상태관리
  const [mouseEnter, setMouseEnter] = useState(false);
  // mouseEnter 이벤트가 일어난 곳의 rank를 기록
  const [eventRank, setEventRank] = useState("");
  // 맨 처음에는 hot100 노래들로 가져오기 (api의 기본값을 hot100 관련 주소로 함.)
  // api는 한번씩만 받아오게 하기 위해 useEffect 설정
  const getSongs = async () => {
    const json = await (
      await fetch(
        `https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-global-200/recent.json`
      )
    ).json();
    setSongs(json.data);
    setDate(json.date);
    setLoading(false);
  };
  // 참고: useEffect내부에서 실행된 함수에서 사용되는 변수를 useEffect의 배열안에 넣어주지 않으면 경고문이 뜨므로 [] 안에 json도 넣어주었다.
  useEffect(() => {
    getSongs();
  }, []);
  const onMouseEnter = (e) => {
    setMouseEnter(true);
    setEventRank(e.target.parentElement.id);
  };
  const onMouseLeave = () => {
    setMouseEnter(false);
    setEventRank("");
  };
  // render
  return (
    <div>
      {loading ? (
        <div className={styles2.Loading}>
          <img src={loadingImg} alt="loading" className={styles2.img} />
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className={styles.Container}>
          <div className={styles.Header}>
            <h1 className={styles.Title}>🎵 Billboard Global 200 Chart 🎵</h1>
            {/* 기준 날짜 */}
            <h2 className={styles.Date}>📆 Base Date : {date}</h2>
            {/* 차트를 고르는 버튼 */}
            <div>
              <Link to={`/`}>
                <button
                  className={styles.ChartSelectBtn}
                  key="billboard-hot-100"
                  id="billboard-hot-100"
                >
                  Billboard Hot 100
                </button>
              </Link>
              <Link to={`/billboard-200`}>
                <button
                  className={styles.ChartSelectBtn}
                  key="billboard-200"
                  id="billboard-200"
                >
                  Billboard 200
                </button>
              </Link>
              <Link to={`/billboard-global-200`}>
                <button
                  className={styles.ChartSelectBtn}
                  key="billboard-global-200"
                  id="billboard-global-200"
                >
                  Billboard Global 200
                </button>
              </Link>
            </div>
          </div>
          {/* 음원 차트 보여주기 */}
          <div className={styles.MusicChart}>
            {songs.map((song) => (
              <div
                className={
                  song.rank % 5 === 0 && song.rank !== 5
                    ? `${styles.Song} ${styles.EdgeSong}`
                    : styles.Song
                }
                key={`hot100${song.rank}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <Chart
                  chart={chart}
                  key={song.rank}
                  rank={song.rank}
                  image={song.image}
                  name={song.name}
                  artist={song.artist}
                  eventRank={eventRank}
                />
                {song.rank <= 5 && eventRank == song.rank ? (
                  <div className={styles.SeeDetailTop} id={song.rank}>
                    <div></div>
                    <div></div>
                    <Link to={`/${chart}/${song.rank}`}>
                      <h2>See Detail 🔍</h2>
                    </Link>
                    <div></div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BillboardGlobal200;
