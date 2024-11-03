import React from 'react';
import { useState } from 'react';
import searchImg from '../assets/icons/search.svg';
import deleteImg from '../assets/icons/delete.svg';

function Search() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="search__wrapper">
      <img src={searchImg} alt="search" />
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        type="text"
        placeholder="search test..."
        className="search__input"
      />
      {searchValue && (
        <img
          onClick={() => setSearchValue('')}
          className="search__delete"
          src={deleteImg}
          alt="delete"
        />
      )}
    </div>
  );
}

export default Search;
