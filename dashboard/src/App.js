import './App.css';
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { HomePage } from './components/homepage/homepage';

import { useState, useCallback, useEffect } from 'react';
import { loadFromLocalStorage } from './logic/class_loadDump';
// PlayGround
// import { HomePageClass } from './components/playground/classhomepage/classHomePage';
import { TrendPlot } from './components/playground/play/plot';
import { Play } from './components/playground/play/play';


function App() {

  const defaultplotSettings = {
    "options": {
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
    "highlightPoints": false,

  }

  // enabledCards ITEMS-NAMES MUST BE EQUAL TO THE CLASSNAME THAT ARE ENABLED
  return (
    <div className='mainContent'>
      {/* <p>Hello World</p> */}
      <HashRouter>
        <Routes>
          <Route path="/investment_visualiser/play" element={<Play />} />
          <Route path="/plot" element={<TrendPlot />} />
          <Route path="/investment_visualiser" element={
            <HomePage
              enabledCards={["FD", "RawData", "SIP"]}
              plotSettings={defaultplotSettings}
              pageId={1}
            />
          }
          />

          <Route path="/investment_visualiser/tax" element={
            <HomePage
              enabledCards={["Tax"]}
              plotSettings={{ ...defaultplotSettings, highlightPoints: true }}
              pageId={2}
            />
          }
          />

          <Route path="/" element={
            <HomePage
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
