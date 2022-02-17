import { useEffect } from 'react'
import {  Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import Dashboard from './dashboard';
import ProjectRouter from './project/router';
import UserRouter from './user/router';
import TestRouter from './other/router';

import { Page, H1, HorizonLNB } from 'opize-components'
import { HeaderWrapper } from '../../components';

export default function Router() {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        document.title = `Admin | Opize`
    }, [])

  return (
    <>
        <HeaderWrapper app="admin" />
        <Page width={720}>
            <H1>Admin</H1>
            <HorizonLNB exact={false} selected={location.pathname} menu={[
                {id: "/admin", label: '대시보드', onClick: () => navigate("/admin")},
                {id: "/admin/project", label: '프로젝트', onClick: () => navigate("/admin/project")},
                {id: "/admin/user", label: '사용자', onClick: () => navigate("/admin/user")},
                {id: "/admin/other", label: '기타', onClick: () => navigate("/admin/other")},
            ]} />

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/project/*" element={<ProjectRouter />} />
                <Route path="/user/*" element={<UserRouter />} />
                <Route path="/other/*" element={<TestRouter />} />
            </Routes>
        </Page>
    
    </>
  );
};
