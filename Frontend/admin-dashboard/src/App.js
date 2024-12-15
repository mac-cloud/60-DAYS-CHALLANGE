import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import AdminDashboard from './Components/AdminDashboard';
import AdminGallery from './Components/AdminGallery';
import AdminUser from './Components/AdminUser';
import Metric from './Components/Metric';
import Notification from './Components/Notification';
import HikingLocations from './Components/Pages/HikingLocations';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/gallery" element={<AdminGallery />} />
      <Route path="/users" element={<AdminUser/>} />
      <Route path="/metric" element={<Metric/>} />
      <Route path="/notification" element={<Notification/>} />
      <Route path="/hiking" element={<HikingLocations/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
