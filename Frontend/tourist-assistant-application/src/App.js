import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import './pages/HomePage';
import HomePage from './pages/HomePage';
import Gallery from './pages/Gallery';
import SignUp from './pages/SignUp';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import GuidePage from './pages/GuidePage';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/guide" element={<GuidePage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
