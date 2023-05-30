// hot100, 200, global200 차트 목록 나타내기

import { useState } from "react";
import { Link } from "react-router-dom"; // {} 써야함!
import PropTypes from "prop-types";
import styles from "./ChartList.module.css";

function Chart({ chart, rank, image, name, artist }) {
  const [mouseEnter, setMouseEnter] = useState(false);
  const [eventRank, setEventRank] = useState("");
  const onMouseEnter = (e) => {
    setMouseEnter(true);
    setEventRank(e.target.parentElement.id);
  };
  const onMouseLeave = () => {
    setMouseEnter(false);
    setEventRank("");
  };
  return (
    <div
      id={rank}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={styles.Relative}
    >
      <h1>{rank}</h1>
      {rank >= 6 && eventRank == rank ? (
        <div className={styles.SeeDetailBottom} id={rank}>
          <div></div>
          <div></div>
          <Link to={`/${chart}/${rank}`}>
            <h2>See Detail 🔍</h2>
          </Link>
          <div></div>
        </div>
      ) : null}
      {/* 부자연스러움 해결 위해 img에도 onMouseEnter 넣어줌. onMouseLeave까지 넣어주면 mouseEnter 상태가 매우 자주 바뀌게 되어 부자연스러워짐. */}
      <img src={image} alt="album-jacket" onMouseEnter={onMouseEnter} />
      <h2>{name}</h2>
      <h4>{artist}</h4>
    </div>
  );
}

Chart.propTypes = {
  chart: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
};

export default Chart;
