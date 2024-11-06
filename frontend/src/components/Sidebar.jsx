import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tests from '../assets/icons/tests.svg';
import arrows from '../assets/icons/arrows.svg';
import Cookies from 'js-cookie';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    Cookies.remove('token');
    navigate('/');
  };
  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar__logo">
          <h1 className="sidebar__title">KPI FICTING</h1>
        </div>
        <div className="sidebar__menu">
          <div className="menu__item active">
            <div className="menu__item--first"></div>
            <div onClick={() => navigate('/')} className="menu__item--info">
              <img src={tests} alt="foto" />
              <p>Tests</p>
            </div>
          </div>
          <div className="toggle-button" onClick={toggleSidebar}>
            <img
              src={arrows}
              alt="arrow"
              className={isOpen ? 'btn__toggle--active' : 'btn__toggle'}
            />
          </div>
        </div>
        <div className="logout">
          <button onClick={logout} className="logout__btn">
            <svg
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.98183 22.2662C2.33048 22.2662 1.77308 22.0344 1.30963 21.571C0.846189 21.1075 0.614071 20.5497 0.613281 19.8976V3.31777C0.613281 2.66642 0.845399 2.10902 1.30963 1.64557C1.77387 1.18213 2.33127 0.950008 2.98183 0.949219H11.2717V3.31777H2.98183V19.8976H11.2717V22.2662H2.98183ZM16.0088 17.5291L14.3805 15.8119L17.4004 12.792H7.71893V10.4234H17.4004L14.3805 7.40351L16.0088 5.68632L21.9302 11.6077L16.0088 17.5291Z"
                fill="#313131"
                className="logout__icon-path"
              />
            </svg>
            <p>Log out</p>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
