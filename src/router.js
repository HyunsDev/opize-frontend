import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Notion from './screen/notion/index';
import Login from './screen/auth/index';

export default function Router() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notion />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Notion />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
