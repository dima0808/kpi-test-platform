import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Test from './pages/Test';
import QuestionPage from './pages/QuestionPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={''}>
        <Route index element={<Login />} />
        <Route path="tests" element={<Home />} />
        <Route path=":id" element={<Test />} />
        <Route path=":id/start" element={<QuestionPage />} />
      </Route>
    </Routes>
  );
}

export default App;
