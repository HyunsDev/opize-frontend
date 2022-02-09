import { useEffect } from 'react'
import {  Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import { H1 } from "../../../components/title/title";
import HorizonLNB from '../../../components/LNB/horizonLNB';

import List from './list'

export default function Router() {
    const navigate = useNavigate()
    const location = useLocation()

  return (
    <>
        <HorizonLNB exact selected={location.pathname} menu={[
            {id: "/admin/project", text: '리스트', onClick: () => navigate("/admin/project")},
            {id: "/admin/project/new", text: '생성', onClick: () => navigate("/admin/project/new")}
        ]} />

        <Routes>
            <Route path="/" element={<List />} />
        </Routes>
    </>
  );
};
