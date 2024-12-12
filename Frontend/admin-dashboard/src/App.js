import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import AdminDashboard from './Components/AdminDashboard';
import AdminGallery from './Components/AdminGallery';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/gallery" element={<AdminGallery />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
