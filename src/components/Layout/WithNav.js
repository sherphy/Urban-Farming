//for pages with navbar
import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';

export default () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};