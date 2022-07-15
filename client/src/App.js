import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome.jsx";
import Home from "./components/Home/Home.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import VideogameDetail from "./components/VideogameDetail/VideogameDetail.jsx";
import VideogameCreate from "./components/VideogameForm/VideogameForm.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/videogameDetails/:id" element={<VideogameDetail />} />
          <Route
            exact
            path="/videogamesCreate"
            element={<VideogameCreate />}
          />
          <Route
            exact
            path="/videogameUpdate/:id"
            element={<VideogameCreate />}
          />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
