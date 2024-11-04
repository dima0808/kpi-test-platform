import React from 'react';
import HeaderDropdownMenu from './HeaderDropdownMenu';
import Search from './Search';

import Tests from '../assets/icons/big-tests.svg';
function Header({ deleteSelectedTests }) {
  return (
    <div className="tests__header">
      <div className="tests__slogan">
        <img className="tests__img" src={Tests} alt="foto" />
        <h1 className="tests__title">Tests</h1>
      </div>
      <div className="tests__tools">
        <HeaderDropdownMenu deleteSelectedTests={deleteSelectedTests} />
        <Search />
      </div>
    </div>
  );
}

export default Header;
