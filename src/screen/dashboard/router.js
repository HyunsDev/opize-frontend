import React from 'react'
import {  Route, Routes } from 'react-router-dom';
import Header from "../../components/header/header";
import { useTranslation } from 'react-i18next';

import Dashboard from './dashboard';

import Logo from '../../assets/opize.png'

export default function Router() {
  const { t } = useTranslation('translation')

  return (
    <>
      <Header logo={Logo} name={t("dashboard")} />
      <Routes>
          <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
};
