import {  Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import HorizonLNB from '../../../components/LNB/horizonLNB';

import Card from './card'

export default function Router() {
    const navigate = useNavigate()
    const location = useLocation()

  return (
    <>
        <HorizonLNB exact selected={location.pathname} menu={[
            {id: "/admin/test/card", text: '카드', onClick: () => navigate("/admin/test/card")},
        ]} />

        <Routes>
            <Route path="/card" element={<Card />} />
        </Routes>
    </>
  );
};
