import React, { useEffect } from 'react';
import { useState } from 'react';
import Header from './Header';
import NotFoundTest from './NotFoundTest';
import {deleteCollectionByName, getAllCollections} from "../utils/http";
import Cookies from "js-cookie";
import DropdownMenu from "./DropdownMenu";


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

    const handleDeleteCollection = async (name) => {
      const token = Cookies.get('token');
      try {
        await deleteCollectionByName(name, token);
        setCollections(collections.filter((collection) => collection.name !== name));
      } catch (error) {
        console.error(error);
      }
    };

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
    const token = Cookies.get('token');
    getAllCollections(token)
      .then((data) => setCollections(data.collections))
      .catch((error) => console.error(error));
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
              <div className="session-table__header-start-date">Questions count</div>
              <div className="session-table__header-actions">Actions</div>
            </div>
            <div className="session-table__body">
              {filteredCollections.map((collection) => (
                <div key={collection.id}>
                  <div>
                    <h2>{collection.name}</h2>
                  </div>
                  <div>
                    {collection.questionsCount}
                  </div>
                  <div>
                    <DropdownMenu id={collection.name} onDelete={handleDeleteCollection} isTest={false} />
                  </div>
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
