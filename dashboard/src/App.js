import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from './components/homepage/homepage';
import { NavBar } from './components/navbar/nav_bar';
// PlayGround
// import { HomePageClass } from './components/playground/classhomepage/classHomePage';
import { TrendPlot } from './components/playground/play/plot';
import { Play } from './components/playground/play/play';

function App() {
  return (
      <div className='mainContent'>
        <NavBar />
        <p>This is Something Check Me</p>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/play" element={<Play/>} />
            
            <Route path="/plot" element={<TrendPlot/>} />
            {/* Github-Pages */}
            <Route path="/investment_visualiser" element={<HomePage/>} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
