import React from 'react';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import GuideAccount from './components/GuideAccount';
import LocationDetails from './components/LocationDetails';
import GuideList from './components/GuideList';
import HikingLocationList from './components/HikingLocationList';
import ServiceList from './components/ServiceList';

function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/guide-list" element={<GuideList/>}/>
          <Route path="/guide" element={<GuideAccount/>} />
          <Route path="/location" element={<LocationDetails/>} />
          <Route path="/location-list" element={<HikingLocationList/>} />
          <Route path="/services" element={<ServiceList/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
