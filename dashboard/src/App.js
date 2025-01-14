import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from './components/homepage/homepage';
import { NavBar } from './components/navbar/nav_bar';
// PlayGround
// import { HomePageClass } from './components/playground/classhomepage/classHomePage';
import { TrendPlot } from './components/playground/play/plot';


function App() {
  return (
      <div className='mainContent'>
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/play" element={<TrendPlot/>} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
