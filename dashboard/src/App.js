import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from './components/homepage/homepage';
import { NavBar } from './components/navbar/nav_bar';
import { useState } from 'react';
// PlayGround
// import { HomePageClass } from './components/playground/classhomepage/classHomePage';
import { TrendPlot } from './components/playground/play/plot';
import { Play } from './components/playground/play/play';


function App() {
  const [defaultStateIndex, setDefaultStateIndex] = useState(-1)

  return (
    <div className='mainContent'>
      <NavBar changeDefaultStateFromExamples={setDefaultStateIndex} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage defaultStateIndex={defaultStateIndex} />} />
          <Route path="/investment_visualiser/play" element={<Play />} />
          <Route path="/plot" element={<TrendPlot />} />
          {/* Github-Pages */}
          <Route path="/investment_visualiser" element={<HomePage defaultStateIndex={defaultStateIndex} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
