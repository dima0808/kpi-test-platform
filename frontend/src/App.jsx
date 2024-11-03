import React from 'react';

import './button.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<div>Login</div>} />
    </Routes>
  );
}

export default App;
