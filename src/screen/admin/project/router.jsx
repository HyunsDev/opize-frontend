import {  Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import HorizonLNB from '../../../components/LNB/horizonLNB';

import List from './list'
import Create from './create'
import Edit from './edit'

export default function Router() {
    const navigate = useNavigate()
    const location = useLocation()

  return (
    <>
        <HorizonLNB exact selected={location.pathname} menu={[
            {id: "/admin/project", text: '리스트', onClick: () => navigate("/admin/project")},
            {id: "/admin/project/create", text: '생성', onClick: () => navigate("/admin/project/create")},
            {id: "/admin/project/edit", text: '편집', onClick: () => navigate("/admin/project/edit")}
        ]} />

        <Routes>
            <Route path="/" element={<List />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit" element={<Edit />} />
        </Routes>
    </>
  );
};
