import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

import info from '../assets/icons/info.svg';
import clone from '../assets/icons/clone.svg';
import edit from '../assets/icons/edit.svg';
import remove from '../assets/icons/remove.svg';

const DropdownMenu = ({ id, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        onClick={handleMenuToggle}
        className={`dropdown-toggle ${isMenuOpen ? 'dropdown-toggle--inactive' : ''}`}>
        <span>Actions</span>
        <svg
          width="22"
          height="22"
          viewBox="0 0 15 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.59801 9.11886L0.226195 2.15009L1.81887 0.408203L7.39435 6.50603L12.9698 0.408203L14.5625 2.15009L8.19068 9.11886C7.97946 9.3498 7.69302 9.47953 7.39435 9.47953C7.09568 9.47953 6.80923 9.3498 6.59801 9.11886Z"
            fill="white"
          />
        </svg>
      </button>
      {isMenuOpen && (
        <div className="dropdown__menu">
          <div className="dropdown__item">
            <img src={info} alt="info" />
            Info
          </div>
          <div className="dropdown__item">
            <img src={clone} alt="clone" />
            Clone
          </div>
          <div className="dropdown__item">
            <img src={edit} alt="edit" />
            Edit
          </div>
          <div onClick={() => onDelete(id)} className="dropdown__item remove">
            <img src={remove} alt="remove" />
            Remove
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
