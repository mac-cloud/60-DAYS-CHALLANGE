import React from 'react';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import GuideAccount from './components/GuideAccount';
import HikingLocation from './components/HikingLocations';
import TentRentals from './components/TentRentals';
import LocationDetails from './components/LocationDetails';
import GuideList from './components/GuideList';

function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<GuideList/>}/>
          <Route path="/hiking" element={<HikingLocation/>} />
          <Route path="/tent" element={<TentRentals/>} />
          <Route path="/guide" element={<GuideAccount/>} />
          <Route path="/location" element={<LocationDetails/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
