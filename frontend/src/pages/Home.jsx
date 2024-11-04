import React from 'react';
import Sidebar from '../components/Sidebar';
import TestsTable from '../components/TestsTable';

function Home() {
  return (
    <div className="container">
      <Sidebar />
      <TestsTable />
    </div>
  );
}

export default Home;
