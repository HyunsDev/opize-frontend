import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserContextProvider from './context/user';

import Notion from './screen/notion/index';
import Login from './screen/auth/login';
import SignUp from './screen/auth/signup';
import EmailVerify from './screen/auth/verify';
import PasswordReset from './screen/auth/reset';
import PasswordResetEmail from './screen/auth/reset-email';
import PasswordResetPassword from './screen/auth/change-password';
import DashboardRouter from './screen/dashboard/router';
import UserRouter from './screen/user/router'

export default function Router() {
  return (
    <div className="App">
        <BrowserRouter>
          <UserContextProvider>
            <Routes>
              <Route path="/" element={<Notion />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/verify" element={<EmailVerify />} />
              <Route path="/reset-password" element={<PasswordReset />} />
              <Route path="/reset-password/email" element={<PasswordResetEmail />} />
              <Route path="/reset-password/change" element={<PasswordResetPassword />} />
              <Route path="/dashboard/*" element={<DashboardRouter />} />
              <Route path="/user/*" element={<UserRouter />} />
              <Route path="*" element={<Notion />} />
            </Routes>
          </UserContextProvider>
        </BrowserRouter>
    </div>
  );
};
