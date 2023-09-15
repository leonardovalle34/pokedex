import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import MainCard from "./Pages/Maincard";
import Carousel from "./Pages/Carousel";

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" Component={MainCard}/>
        <Route path="/game" Component={Carousel}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
