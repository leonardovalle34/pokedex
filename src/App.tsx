import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import MainCard from "./Pages/Maincard";
import MainCarousel from "./components/carrossel/mainCarousel";

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" Component={MainCard}/>
        <Route path="/game" Component={MainCarousel}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
