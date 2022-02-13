import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserContextProvider from './context/user';
import DashContextProvider from './context/dashboard';

import Notion from './screen/notion/index';
import Login from './screen/auth/login';
import SignUp from './screen/auth/signup';
import EmailVerify from './screen/auth/verify';
import PasswordReset from './screen/auth/reset';
import PasswordResetEmail from './screen/auth/reset-email';
import PasswordResetPassword from './screen/auth/change-password';
import DashboardRouter from './screen/dashboard/router';
import UserRouter from './screen/user/router';
import AdminRouter from './screen/admin/router';
import Redirect from './screen/redirect';
import Subscribe from './screen/subscribe/subscribe';
import Payment from './screen/payment/payment';

export default function Router() {
  return (
    <div className="App">
        <BrowserRouter>
          <UserContextProvider>
            <DashContextProvider>
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
                <Route path="/admin/*" element={<AdminRouter />} />
                <Route path="/r/*" element={<Redirect />} />
                <Route path="/subscribe" element={<Subscribe />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="*" element={<Notion />} />
              </Routes>
            </DashContextProvider>
          </UserContextProvider>
        </BrowserRouter>
    </div>
  );
};
