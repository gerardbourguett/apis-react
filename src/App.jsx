import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Farmacias from './components/Farmacias';
import FarmaciaTurno from './components/FarmaciaTurno';
import AppFooter from './components/AppFooter';
import Inicio from './components/Inicio';
import MercadoPublico from './components/MercadoPublico';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
function App() {
  return (
    <Router>
      <div>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/farmacias" element={<Farmacias />} />
          <Route path="/farmacia-turno" element={<FarmaciaTurno />} />
          <Route path="/mercadopublico" element={<MercadoPublico />} />
        </Routes>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
