import {  Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import HorizonLNB from '../../../components/LNB/horizonLNB';

import List from './list'
import Edit from './edit'
import Detail from './detail'
import Refund from './refund'

export default function Router() {
    const navigate = useNavigate()
    const location = useLocation()

  return (
    <>
        <HorizonLNB exact selected={location.pathname} menu={[
            {id: "/admin/user", text: '리스트', onClick: () => navigate("/admin/user")},
            {id: "/admin/user/edit", text: '편집', onClick: () => navigate("/admin/user/edit")},
            {id: "/admin/user/detail", text: '자세한 정보', onClick: () => navigate("/admin/user/detail")},
            {id: "/admin/user/refund", text: '환불', onClick: () => navigate("/admin/user/refund")},
        ]} />

        <Routes>
            <Route path="/" element={<List />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/refund" element={<Refund />} />
        </Routes>
    </>
  );
};
