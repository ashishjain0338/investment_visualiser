import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from './components/homepage/homepage';
import { NavBar } from './components/navbar/nav_bar';
// PlayGround
// import { HomePageClass } from './components/playground/classhomepage/classHomePage';
// import { LightModeNavBar} from './components/playground/play/play';

function App() {
  return (
      <div className='mainContent'>
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<HomePage/>} />
            {/* <Route path="/play" element={<LightModeNavBar/>} /> */}
          </Routes>
        </BrowserRouter>
        <p>Your World</p>
        <p>Your World</p>
        <p>Your World</p>
        <p>Your World</p>
        <p>Your World</p>
        <p>Your World</p>
        <p>Your World</p>
        <p>Your World</p>
        <p>Your World</p>
        <p>Your World</p>
        <p>Your World</p>
        <p>Your World</p>
        <p>Your World</p>
        <p>Your World</p>
        <p>Your World</p>

      </div>
  );
}

export default App;
