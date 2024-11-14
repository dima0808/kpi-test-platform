import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Test from './pages/Test';
import TestCreation from './pages/TestCreation';
import TestInfo from './pages/TestInfo';
import Sidebar from './components/Sidebar';
import SessionDetails from './pages/SessionDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={''}>
        <Route index element={<Login />} />
        <Route path="tests" element={<Home />} />
        <Route path=":id" element={<Test />} />
        <Route path="tests/:id" element={<TestInfo />} />
        <Route path="create-test" element={<TestCreation />} />
        <Route path="create-collection" element={<div>Create Collection</div>} />
        <Route path="session-details/:id" element={<SessionDetails />} />
        <Route path="collections" element={<Home />} />
      </Route>
      <Route
        path="*"
        element={
          <div>
            <h1>NotFoundPage</h1>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
