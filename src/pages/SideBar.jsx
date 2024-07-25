import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faChartBar, faBars, faHandshake, faSignOutAlt, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import './SideBar.css';
import { icon } from '@fortawesome/fontawesome-svg-core';

const SideBar = ({ isLoginPage, children, logout }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItem = [
    { path: '/home', name: 'Home', icon: faHome },
    { path: '/parent', name: 'Meeting-form', icon: faHandshake },
    { path: '/glaccount', name: 'GLAccount', icon: faBook },
    { path: '/reports', name: 'Report', icon: faChartBar },
    {path: '/transc', name:'Transcation', icon:  faExchangeAlt}
   
  ];

  if (isLoginPage) {
    return null;
  }

  return (
    <div className="container">
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="top-section">
          <h1 className="logo">{isOpen ? 'Dashboard' : ''}</h1>
          <div className="bars" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} className="icon" />
          </div>
        </div>
        <div className="menu">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) => (isActive ? 'link active' : 'link')}
            >
              <FontAwesomeIcon icon={item.icon} className="icon" />
              <div className="link_text">{isOpen ? item.name : ''}</div>
            </NavLink>
          ))}
        </div>
        <div className="logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
          <div className="link_text">{isOpen ? 'Logout' : ''}</div>
        </div>
      </div>
      <main className={isOpen ? 'main-open' : 'main-closed'}>{children}</main>
    </div>
  );
};

export default SideBar;
