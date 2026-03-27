import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import SkinTreatments from './pages/SkinTreatments';
import BeautyTreatments from './pages/BeautyTreatments';
import SpaTreatments from './pages/SpaTreatments';
import Appointments from './pages/Appointments';
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
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skin-treatments" element={<SkinTreatments />} />
          <Route path="/beauty-treatments" element={<BeautyTreatments />} />
          <Route path="/spa-treatments" element={<SpaTreatments />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
