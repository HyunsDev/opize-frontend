import React from 'react'
import {  Route, Routes } from 'react-router-dom';
import Header from "../../components/header/header";

import Dashboard from './dashboard';


export default function Router() {
  return (
    <>
      <Header app="dashboard" />
      <Routes>
          <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
};
