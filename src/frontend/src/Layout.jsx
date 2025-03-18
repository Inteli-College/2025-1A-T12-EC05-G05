// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/SideBar';
import './styles/Layout.css';

const Layout = () => {
  return (
    <div className="layout">
        <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
