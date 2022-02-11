import { useEffect } from 'react'
import {  Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Header from "../../components/header/header";

import Dashboard from './dashboard';
import ProjectRouter from './project/router';
import UserRouter from './user/router';
import TestRouter from './test/router';

import Page from "../../components/page/default";
import { H1 } from "../../components/title/title";
import HorizonLNB from '../../components/LNB/horizonLNB';


export default function Router() {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        document.title = `운영자 | Opize`
    }, [])

  return (
    <>
        <Header app="admin" />
        <Page width={720}>
            <H1>운영자</H1>
            <HorizonLNB selected={location.pathname} menu={[
                {id: "/admin", text: '대시보드', onClick: () => navigate("/admin")},
                {id: "/admin/project", text: '프로젝트', onClick: () => navigate("/admin/project")},
                {id: "/admin/user", text: '사용자', onClick: () => navigate("/admin/user")},
                {id: "/admin/test", text: '테스트', onClick: () => navigate("/admin/test")},
            ]} />

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/project/*" element={<ProjectRouter />} />
                <Route path="/user/*" element={<UserRouter />} />
                <Route path="/test/*" element={<TestRouter />} />
            </Routes>
        </Page>
    
    </>
  );
};
