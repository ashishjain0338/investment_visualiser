import './App.css';
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { HomePage } from './components/homepage/homepage';
import { NavBar } from './components/navbar/nav_bar';
import { useState, useCallback, useEffect } from 'react';
import { loadFromLocalStorage } from './logic/class_loadDump';
// PlayGround
// import { HomePageClass } from './components/playground/classhomepage/classHomePage';
import { TrendPlot } from './components/playground/play/plot';
import { Play } from './components/playground/play/play';


function App() {
  const [defaultStateIndex, setDefaultStateIndex] = useState(-1)
  const [loadState, setLoadState] = useState(undefined)
  const [stateDownloadSignal, setStateDownloadSignal] = useState(-1);
  const [stateSaveSignal, setStateSaveSignal] = useState(-1);

  const downloadSignal = useCallback(() => {
    if (stateDownloadSignal == -1) {
      setStateDownloadSignal(0);
    } else {
      setStateDownloadSignal((stateDownloadSignal + 1) % 2); // Toggling
    }

  })

  const saveSignal = useCallback(() => {
    if (stateSaveSignal == -1) {
      setStateSaveSignal(0);
    } else {
      setStateSaveSignal((stateSaveSignal + 1) % 2); // Toggling
    }

  })


  const setLoadStateCallBack = useCallback((loadedState) => {
    setLoadState(loadedState);
  })

  // At First-render, Load-State from Session-Storage
  useEffect(() => {
    let savedState = loadFromLocalStorage("savedState");
    if (typeof savedState !== "undefined") {
      setLoadState(savedState);
    }

  }, [])

  const defaultplotSettings = {
    "options" : {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: "none"
      },
      scales: {
        x: {
          type: "linear",
          title: {
            display: true,
            text: "Time (Years)"
          }
        },
        y: {
          title: {
            display: true,
            text: 'Amount (Rs)'
          },
        }
      },
    },
    "highlightPoints" : false,

  }

  // enabledCards ITEMS-NAMES MUST BE EQUAL TO THE CLASSNAME THAT ARE ENABLED
  return (
    <div className='mainContent'>
      <NavBar
        changeDefaultStateFromExamples={setDefaultStateIndex}
        downloadSignal={downloadSignal}
        saveSignal={saveSignal}
        setLoadState={setLoadStateCallBack}
        
      />
      <HashRouter>
        <Routes>
          <Route path="/investment_visualiser/play" element={<Play />} />
          <Route path="/plot" element={<TrendPlot />} />
          <Route path="/investment_visualiser" element={
            <HomePage
              defaultStateIndex={defaultStateIndex}
              stateDownloadSignal={stateDownloadSignal}
              stateSaveSignal={stateSaveSignal}
              loadedState={loadState}
              enabledCards={["FD", "RawData", "SIP"]}
              plotSettings={defaultplotSettings}
            />
          }
          />
;

          <Route path="/investment_visualiser/tax" element={
            <HomePage
              defaultStateIndex={defaultStateIndex}
              stateDownloadSignal={stateDownloadSignal}
              stateSaveSignal={stateSaveSignal}
              loadedState={loadState}
              enabledCards={["Tax"]}
              plotSettings={{ ...defaultplotSettings, highlightPoints: true }}

            />
          }
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
