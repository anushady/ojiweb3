import "./App.css";
import CanvasHero from "./components/CanvasHero";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Partners from "./components/Partners";
import Trades from "./components/Trades";
import Mission from "./components/Mission";
import Scroll from "./components/utills/Scroll";

function App() {
  return (
    <div className="App">
      <Scroll />
      <Nav />
      <div className="CanvasContainer">
        <CanvasHero />
      </div>
      <Hero />
      <About />
      <Trades />
      <Partners />
      <Mission />
    </div>
  );
}

export default App;
