import React from 'react';

import './button.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Test from './pages/Test';

function App() {
  return (
    <Routes>
      <Route path="/" element={''}>
        <Route index element={<Login />} />
        <Route path=":id" element={<Test />} />
        <Route path="tests" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
