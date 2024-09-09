// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './layout/Navbar';
import styles from '../styles/layout/Layout.module.css';
import Footer from './layout/Footer';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Navbar className={styles.navbar} />
      <main className={styles.body}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
