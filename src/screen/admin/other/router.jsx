import {  Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import HorizonLNB from '../../../components/LNB/horizonLNB';

import Card from './card'
import Redirect from './redirect'
import NotionMap from './notionMap'
import Banner from './banner'
import File from './file'

export default function Router() {
    const navigate = useNavigate()
    const location = useLocation()

  return (
    <>
        <HorizonLNB exact selected={location.pathname} menu={[
            {id: "/admin/other/card", text: '카드', onClick: () => navigate("/admin/other/card")},
            {id: "/admin/other/redirect", text: '리다이렉트', onClick: () => navigate("/admin/other/redirect")},
            {id: "/admin/other/notionMap", text: '노션 맵', onClick: () => navigate("/admin/other/notionMap")},
            {id: "/admin/other/banner", text: '배너', onClick: () => navigate("/admin/other/banner")},
            {id: "/admin/other/file", text: '파일', onClick: () => navigate("/admin/other/file")},
        ]} />

        <Routes>
            <Route path="/card" element={<Card />} />
            <Route path="/redirect" element={<Redirect />} />
            <Route path="/notionMap" element={<NotionMap />} />
            <Route path="/banner" element={<Banner />} />
            <Route path="/file" element={<File />} />
        </Routes>
    </>
  );
};
