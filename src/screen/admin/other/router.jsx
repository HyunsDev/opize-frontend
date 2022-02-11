import {  Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import HorizonLNB from '../../../components/LNB/horizonLNB';

import Card from './card'
import Redirect from './redirect'

export default function Router() {
    const navigate = useNavigate()
    const location = useLocation()

  return (
    <>
        <HorizonLNB exact selected={location.pathname} menu={[
            {id: "/admin/other/card", text: '카드', onClick: () => navigate("/admin/other/card")},
            {id: "/admin/other/redirect", text: '리다이렉트', onClick: () => navigate("/admin/other/redirect")},
        ]} />

        <Routes>
            <Route path="/card" element={<Card />} />
            <Route path="/redirect" element={<Redirect />} />
        </Routes>
    </>
  );
};
