// 노래를 눌렀을 때 detail

import { useState, useEffect } from "react";

function SongDetail() {
  const [currentUrl, setCurrentUrl] = useState(window.location.pathname);
  // 현재 주소에서 차트 종류를 나타내는 부분만 추출 (ex) http://localhost:3000/song/billboard-hot-100rank/1에서 billboard-hot-100이 차트 종류에 해당!)
  const chart = currentUrl.slice(6, -6);
  // 현재 주소에서 음원 순위를 나타내는 부분만 추룩 (ex) 위 주소에서 마지막 / 다음에 적힌 숫자가 해당!)
  const rank = currentUrl.slice(28);
  const [songInfo, setSongInfo] = useState({});
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
    setArtistInfo(json);
  };
  useEffect(() => {
    getArtistDetail();
  }, []);
  console.log(artistInfo);
  return (
    <div>
      <image src={songInfo.image} alt="album-jacket"></image>
      <h1>rank {songInfo.rank}</h1>
      <h1>{songInfo.name}</h1>
      <ul>
        <li>Peak Rank : {songInfo.peak_rank}</li>
        <li>Last Week Rank : {songInfo.last_week_rank}</li>
        <li>Weeks on Chart : {songInfo.weeks_on_chart}</li>
      </ul>
    </div>
  );
}

export default SongDetail;
