import { useEffect } from 'react'
import {  Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import { H1 } from "../../../components/title/title";
import HorizonLNB from '../../../components/LNB/horizonLNB';

import List from './list'
import Edit from './edit'

export default function Router() {
    const navigate = useNavigate()
    const location = useLocation()

  return (
    <>
        <HorizonLNB exact selected={location.pathname} menu={[
            {id: "/admin/user", text: '리스트', onClick: () => navigate("/admin/user")},
            {id: "/admin/user/edit", text: '수정', onClick: () => navigate("/admin/user/edit")}
        ]} />

        <Routes>
            <Route path="/" element={<List />} />
            <Route path="/edit" element={<Edit />} />
        </Routes>
    </>
  );
};
