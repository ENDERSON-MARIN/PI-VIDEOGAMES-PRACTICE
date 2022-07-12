import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
