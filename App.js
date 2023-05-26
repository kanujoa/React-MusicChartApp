import Home from "./routes/Home";
import SongDetail from "./routes/SongDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
        <Route
          path={`${process.env.PUBLIC_URL}/song/:chartrank/:rank`}
          element={<SongDetail />}
        />
      </Routes>
    </Router>
  );
}

export default App;
