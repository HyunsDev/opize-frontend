import React from 'react'
import {  Route, Routes } from 'react-router-dom';
import { HeaderWrapper } from '../../components';

import Dashboard from './dashboard';


export default function Router() {
  return (
    <>
      <HeaderWrapper app="dashboard" />
      <Routes>
          <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
};
