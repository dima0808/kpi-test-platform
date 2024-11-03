import React from 'react';
import { useState } from 'react';

import Header from './Header';
import SessionRow from './SessionRow';

const testData = [
  {
    id: 'a11255ee-fbbd-4e7e-95ad-256f51c22c93',
    name: 'Math Test',
    openDate: '22.11.2024 12:00',
    deadline: '22.11.2024 15:00',
    minutesToComplete: 60,
    maxScore: 100,
    startedSessions: 100,
    finishedSessions: 8,
  },
  {
    id: '3d2ab046-9f47-4343-b49f-7df8d17fc226',
    name: 'Physics Test',
    openDate: '23.11.2024 09:00',
    deadline: '23.11.2024 12:00',
    minutesToComplete: 90,
    maxScore: 150,
    startedSessions: 15,
    finishedSessions: 12,
  },
  {
    id: '6f77f636-7e08-4713-9327-8e0c494f09ac',
    name: 'Chemistry Test',
    openDate: '01.11.2024 14:00',
    deadline: '03.11.2024 23:16',
    minutesToComplete: 45,
    maxScore: 75,
    startedSessions: 20,
    finishedSessions: 18,
  },
];

const TestsTable = () => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    // Тут можна додати функціональність для вибору всіх тестів
  };

  return (
    <div className="tests-table">
      <Header />
      <div className="session-table">
        <div className="session-table__header">
          <div className="session-table__header-checkbox">
            <input type="checkbox" id="selectAll" checked={selectAll} onChange={handleSelectAll} />
            <label htmlFor="selectAll"></label>
          </div>
          <div className="session-table__header-title">Title</div>
          <div className="session-table__header-start-date">Start date</div>
          <div className="session-table__header-end-date">End date</div>
          <div className="session-table__header-status">Status</div>
          <div className="session-table__header-sessions">
            <span>Active sessions</span>
          </div>
          <div className="session-table__header-actions">Actions</div>
        </div>
        {testData.map((test) => (
          <SessionRow
            id={test.id}
            name={test.name}
            openDate={test.openDate}
            deadline={test.deadline}
            startedSessions={test.startedSessions}
          />
        ))}
      </div>
    </div>
  );
};

export default TestsTable;
