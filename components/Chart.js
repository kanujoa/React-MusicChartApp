// hot100, 200, global200 차트 목록 나타내기

import { Link } from "react-router-dom"; // {} 써야함!
import PropTypes from "prop-types";

function Chart({ chart, rank, image, name, artist }) {
  return (
    <div>
      <h1>{rank}</h1>
      <Link to={`/${chart}/${rank}`}>
        <img src={image} alt="album-jacket" />
      </Link>
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
