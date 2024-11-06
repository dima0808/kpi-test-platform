import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Test from './pages/Test';
import TestCreation from './pages/TestCreation';
import TestInfo from './pages/TestInfo';

function App() {
  return (
    <Routes>
      <Route path="/" element={''}>
        <Route index element={<Login />} />
        <Route path="tests" element={<Home />} />
        <Route path=":id" element={<Test />} />
        <Route path="tests/:id" element={<TestInfo />} />
        <Route path="create-test" element={<TestCreation />} />
      </Route>
    </Routes>
  );
}

export default App;
