import { useState, useEffect } from "react";
import Chart from "../components/Chart";

function Home() {
  // api 가져올 때 loading
  const [loading, setLoading] = useState(true);
  // hot100, 200, global200 중 어떤 차트를 보여줄 것인지 걸정
  const [chart, setChart] = useState("billboard-hot-100");
  console.log(chart);
  // chart에 따른 api 주소 설정
  const [api, setApi] = useState(
    `https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-hot-100/recent.json`
  );
  // 화면에 보여줄 곡 목록 설정
  const [songs, setSongs] = useState([]);
  // 맨 처음에는 hot100 노래들로 가져오기 (api의 기본값을 hot100 관련 주소로 함.)
  // api는 한번씩만 받아오게 하기 위해 useEffect 설정
  const getSongs = async () => {
    const json = await (await fetch(api)).json();
    setSongs(json.data);
    setLoading(false);
  };
  // 참고: useEffect내부에서 실행된 함수에서 사용되는 변수를 useEffect의 배열안에 넣어주지 않으면 경고문이 뜨므로 [] 안에 json도 넣어주었다.
  useEffect(() => {
    getSongs();
  }, [chart]); // useEffect는 []안에 있는 state를 항상 주시 가능! chart가 바뀔 때마다 getSongs() 함수를 다시 실행한다.
  // 첫 화면 모두 렌더링 이후 사용자가 어떤 차트를 클릭했는지에 따라 chart, api state 변경하기
  const changeChart = (e) => {
    setLoading(true); // 다른 api를 받아 올 동안 loading을 띄우기 위해 작성, 다 받아오면 loading이 falase가 되고 아래 jsx가 렌더링됨.
    if (e.target.id === "billboard-hot-100") {
      setChart("billboard-hot-100");
      setApi(
        `https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-hot-100/recent.json`
      );
    } else if (e.target.id === "billboard-200") {
      setChart("200");
      setApi(
        `https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-200/recent.json`
      );
    } else if (e.target.id === "billboard-global-200") {
      setChart("billboard-global-200");
      setApi(
        `https://raw.githubusercontent.com/KoreanThinker/billboard-json/main/billboard-global-200/recent.json`
      );
    }
  };
  // render
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {/* 현재 chart에 따른 제목 */}
          {chart === "billboard-hot-100" ? (
            <h1>Billboard Hot 100 Chart</h1>
          ) : null}
          {chart === "billboard-200" ? <h1>Billboard 200 Chart</h1> : null}
          {chart === "billboard-global-200" ? (
            <h1>Billboard Global 200 Chart</h1>
          ) : null}
          {/* 차트를 고르는 버튼 */}
          <div>
            <button
              key="billboard-hot-100"
              id="billboard-hot-100"
              onClick={changeChart}
            >
              Billboard Hot 100
            </button>
            <button
              key="billboard-200"
              id="billboard-200"
              onClick={changeChart}
            >
              Billboard 200
            </button>
            <button
              key="billboard-global-200"
              id="billboard-global-200"
              onClick={changeChart}
            >
              Billboard Global 200
            </button>
          </div>
          {/* 음원 차트 보여주기 */}
          {songs.map((song) => (
            <Chart
              chart={chart}
              key={song.rank}
              rank={song.rank}
              image={song.image}
              name={song.name}
              artist={song.artist}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
