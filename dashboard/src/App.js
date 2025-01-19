import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from './components/homepage/homepage';
import { NavBar } from './components/navbar/nav_bar';
import { useState, useCallback } from 'react';
// PlayGround
// import { HomePageClass } from './components/playground/classhomepage/classHomePage';
import { TrendPlot } from './components/playground/play/plot';
import { Play } from './components/playground/play/play';


function App() {
  const [defaultStateIndex, setDefaultStateIndex] = useState(-1)
  const [loadState, setLoadState] = useState(undefined)
  const [stateDownloadSignal, setStateDownloadSignal] = useState(-1);

  const downloadSignal = useCallback(() => {
    if (stateDownloadSignal == -1) {
      setStateDownloadSignal(0);
    } else {
      setStateDownloadSignal((stateDownloadSignal + 1) % 2); // Toggling
    }

  })

  const setLoadStateCallBack = useCallback((loadedState) => {
    setLoadState(loadedState)
  }

  )

  return (
    <div className='mainContent'>
      <NavBar changeDefaultStateFromExamples={setDefaultStateIndex} downloadSignal={downloadSignal} setLoadState={setLoadStateCallBack}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <HomePage
              defaultStateIndex={defaultStateIndex}
              stateDownloadSignal={stateDownloadSignal}
              loadedState={loadState}
            />} />
          <Route path="/investment_visualiser/play" element={<Play />} />
          <Route path="/plot" element={<TrendPlot />} />
          {/* Github-Pages */}
          <Route path="/investment_visualiser" element={
            <HomePage
              defaultStateIndex={defaultStateIndex}
              stateDownloadSignal={stateDownloadSignal}
              loadedState={loadState} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
