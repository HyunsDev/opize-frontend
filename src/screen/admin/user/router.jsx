import {  Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import { HorizonLNB } from 'opize-components';

import List from './list'
import Edit from './edit'
import Detail from './detail'
import PaymentCancel from './paymentCancel'

export default function Router() {
    const navigate = useNavigate()
    const location = useLocation()

  return (
    <>
        <HorizonLNB exact selected={location.pathname} menu={[
            {id: "/admin/user", label: '리스트', onClick: () => navigate("/admin/user")},
            {id: "/admin/user/edit", label: '편집', onClick: () => {}},
            {id: "/admin/user/detail", label: '자세한 정보', onClick: () => {}},
            {id: "/admin/user/paymentCancel", label: '결제 취소', onClick: () => {}},
        ]} />

        <Routes>
            <Route path="/" element={<List />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/paymentCancel" element={<PaymentCancel />} />
        </Routes>
    </>
  );
};
