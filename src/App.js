import Home from "./routes/Home";
import SongDetail from "./routes/SongDetail";
import Billboard200 from "./routes/Billboard200";
import BillboardGlobal200 from "./routes/BillboardGlobal200";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/billboard-200`} element={<Billboard200 />} />
        <Route
          path={`/billboard-global-200`}
          element={<BillboardGlobal200 />}
        />
        <Route path={`/:chart/:rank`} element={<SongDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
