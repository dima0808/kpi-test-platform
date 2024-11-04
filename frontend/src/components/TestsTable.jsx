import React, { useEffect } from 'react';
import { useState } from 'react';

import Header from './Header';
import SessionRow from './SessionRow';
import { deleteTestById, getAllTests } from '../http';
import Cookies from 'js-cookie';

const TestsTable = () => {
  const [tests, setTests] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleDeleteTest = async (id) => {
    const token = Cookies.get('token');
    try {
      await deleteTestById(id, token);
      setTests(tests.filter((test) => test.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = Cookies.get('token');
    getAllTests(token)
      .then((data) => setTests(data.tests))
      .catch((error) => console.error(error));
  }, []);

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
        {tests.length === 0 ? (
          <div className="no-tests">Ой, тестів немає</div>
        ) : (
          tests.map((test) => (
            <SessionRow
              key={test.id}
              id={test.id}
              name={test.name}
              openDate={test.openDate}
              deadline={test.deadline}
              startedSessions={test.startedSessions}
              selectAll={selectAll}
              onDelete={handleDeleteTest}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TestsTable;
