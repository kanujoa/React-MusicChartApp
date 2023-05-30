// 노래를 눌렀을 때 detail

import { useState, useEffect } from "react";
import ArtistInfo from "../components/ArtistInfo";
import SongInfo from "../components/SongInfo";
import styles from "../components/Detail.module.css";

function SongDetail() {
  // 현재 주소의 pathname을 가져옴.
  const currentUrl = window.location.pathname;
  // 현재 주소에서 차트 종류를 나타내는 부분만 추출 (ex) /billboard-hot-100/1에서 billboard-hot-100이 차트 종류에 해당!)
  const chart = currentUrl.slice(
    currentUrl.indexOf("/") + 1,
    currentUrl.lastIndexOf("/")
  );
  // 현재 주소에서 음원 순위를 나타내는 부분만 추룩 (ex) 위 주소에서 마지막 / 다음에 적힌 숫자가 해당!)
  const rank = currentUrl.slice(currentUrl.lastIndexOf("/") + 1);
  const [songInfo, setSongInfo] = useState({});
  const [inArtist100, setInArtist100] = useState(false);
  const [artistInfo, setArtistInfo] = useState({});
  const getSongDetail = async () => {
    const json = await (
      await fetch(
        `https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/${chart}/recent.json`
      )
    ).json();
    setSongInfo(json.data[rank - 1]);
  };
  useEffect(() => {
    getSongDetail();
  }, []);
  const getArtistDetail = async () => {
    const json = await (
      await fetch(
        `https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-artist-100/recent.json`
      )
    ).json();
    for (let data of json.data) {
      if (data.name === songInfo.artist) {
        console.log(data);
        setInArtist100(true);
        setArtistInfo(data);
        break;
      }
    }
  };
  useEffect(() => {
    getArtistDetail();
  }, [songInfo]); // getArtistDetail 함수는 songInfo에 의존하므로 그것을 계속 주시해야 함.
  console.log(songInfo.artist);
  return (
    <div class={styles.Container}>
      <div id={styles.FirstBlock}>
        <img
          src={songInfo.image}
          alt="album-jacket"
          className={styles.Background}
        />
      </div>
      <SongInfo
        className={styles.SongInfo}
        rank={songInfo.rank}
        name={songInfo.name}
        peak={songInfo.peak_rank}
        lastWeek={songInfo.last_week_rank}
        weeksOnChart={songInfo.weeks_on_chart}
      />
      {/* a tag에서 target 속성을 "_blank"로 설정하면 외부 링크가 새로운 탭에서 활성화된다.
      rel 속성의 noopener는 현재 활성화된 페이지와 새로운 탭에서 활성화되는 페이지를 별개의 프로세스로 취급한다. 
    noreferrer는 현재 활성화된 페이지의 정보를 새로운 탭에서 활성화되는 페이지에 전달하지 않는다. */}
      <a
        href={`https://www.youtube.com/results?search_query=${songInfo.name}-${songInfo.artist}`}
        target="_brank"
        rel="noopener"
      >
        <button className={styles.Listen}>Go To Listen 🎧</button>
      </a>
      <div className={styles.SecondBlock}>
        <ArtistInfo
          className={styles.ArtistInfo}
          image={artistInfo.image}
          aritst={songInfo.artist}
          rank={artistInfo.rank}
          peak={artistInfo.peak_rank}
          lastWeek={artistInfo.last_week_rank}
          weeksOnChart={artistInfo.weeks_on_chart}
          inArtist100={inArtist100}
        />
      </div>
    </div>
  );
}

export default SongDetail;
