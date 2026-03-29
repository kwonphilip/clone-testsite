import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/home';
import SkinTreatments from './pages/skin-treatments/SkinTreatments';
import BeautyTreatments from './pages/beauty-treatments/BeautyTreatments';
import Appointments from './pages/appointments/Appointments';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skin-treatments" element={<SkinTreatments />} />
          <Route path="/beauty-treatments" element={<BeautyTreatments />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;
