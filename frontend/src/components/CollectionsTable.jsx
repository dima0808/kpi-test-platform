import React, { useEffect } from 'react';
import { useState } from 'react';
import Header from './Header';
import SessionRow from './SessionRow';
import { deleteTestById, getAllTests } from '../utils/http';
import Cookies from 'js-cookie';
import NotFoundTest from './NotFoundTest';

const collectionData = [
  {
    id: 1,
    name: 'Collections 1',
  },
  {
    id: 2,
    name: 'Collections 2',
  },
  {
    id: 3,
    name: 'Collections 3',
  },
  {
    id: 4,
    name: 'Collections 4',
  },
  {
    id: 5,
    name: 'Collections 5',
  },
];

const CollectionsTable = () => {
  const [collections, setCollections] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredCollections = collections.filter((test) =>
    test.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  //   const handleDeleteTest = async (id) => {
  //     const token = Cookies.get('token');
  //     try {
  //       await deleteTestById(id, token);
  //       setTests(tests.filter((test) => test.id !== id));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const deleteSelectedTests = async () => {
  //     const token = Cookies.get('token');
  //     try {
  //       await Promise.all(selectedTests.map((id) => deleteTestById(id, token)));
  //       setTests(tests.filter((test) => !selectedTests.includes(test.id)));
  //       setSelectedTests([]);
  //       setSelectAll(false);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  useEffect(() => {
    // const token = Cookies.get('token');
    // getAllTests(token)
    //   .then((data) => setTests(data.tests))
    //   .catch((error) => console.error(error));
    setCollections(collectionData);
  }, []);

  return (
    <div className="tests-table">
      <Header
        title={'Collections'}
        onSearch={handleSearch}
        // deleteSelectedTests={deleteSelectedTests}
      />
      <div className="session-table">
        {filteredCollections.length === 0 ? (
          <NotFoundTest />
        ) : (
          <>
            <div className="session-table__header">
              <div className="session-table__header-checkbox">
                <input
                  type="checkbox"
                  id="selectAll"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
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
            <div className="session-table__body">
              {filteredCollections.map((collection) => (
                <div key={collection.id}>
                  <h2>{collection.name}</h2>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CollectionsTable;
