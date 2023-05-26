// 노래를 눌렀을 때 detail

import { useState, useEffect } from "react";

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
  return (
    <div>
      <div>
        <img src={songInfo.image} alt="album-jacket" />
      </div>
      <div>
        <h1>rank {songInfo.rank}</h1>
        <h1>{songInfo.name}</h1>
      </div>
      <ul>
        <li>Peak Rank of Song: {songInfo.peak_rank}</li>
        <li>Last Week Rank of Song: {songInfo.last_week_rank}</li>
        <li>Weeks on Chart of Song: {songInfo.weeks_on_chart}</li>
      </ul>
      {/* <img src={artistInfo.data[0].image} /> */}
      <div>
        <h1>Artist's Info</h1>
        <img src={artistInfo.image} />
        <h1>{songInfo.artist}</h1>
      </div>
      {inArtist100 ? (
        <ul>
          <li>Artist's Rank : {artistInfo.rank}</li>
          <li>Artist's Peak Rank : {artistInfo.peak_rank}</li>
          <li>Artist's Last Week Rank : {artistInfo.last_week_rank}</li>
          <li>Artist's Weeks on Chart : {artistInfo.weeks_on_chart}</li>
        </ul>
      ) : (
        <h3>This artist is not in billboard-artist-100 chart now.</h3>
      )}
      <a
        href={`https://www.youtube.com/results?search_query=${songInfo.name} ${songInfo.artist}`}
      >
        <button>Go To Listen 🎧</button>
      </a>
    </div>
  );
}

export default SongDetail;
