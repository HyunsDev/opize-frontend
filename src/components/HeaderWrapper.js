import { Header } from 'opize-components'

import defaultApp from '../data/opizeApp.json'
import { useTranslation } from 'react-i18next';
import { useMemo, useContext, useEffect, useState } from "react";

import { UserContext } from "../context/user";
import { DashboardContext } from "../context/dashboard";

export function HeaderWrapper(props){
    const { t } = useTranslation('translation')
    const { user, initUser } = useContext(UserContext)
    const { dashboard, initDashboard } = useContext(DashboardContext)
    const [ menus, setMenus ] = useState([
        { label: t('developer'), to: '/developer' },
        { label: t('project'), to: '/' },
        { label: t('dashboard'), to: '/dashboard' },
    ])
    
    useEffect(() => {
        initUser()
    }, [initUser])

    useEffect(() => {
        initDashboard()
    }, [initDashboard])

    useEffect(() => {
        if (!user.isVerified) {
            setMenus([
                { label: t('developer'), to: '/developer' },
                { label: t('info'), to: '/' },
            ])
        } else {
            if (user?.roles?.includes('admin')) {
                setMenus([
                    { label: '개발자', to: '/admin' },
                    { label: t('developer'), to: '/developer' },
                    { label: t('info'), to: '/' },
                    { label: t('dashboard'), to: '/dashboard' },
                ])
            } else {
                setMenus([
                    { label: t('developer'), to: '/developer' },
                    { label: t('info'), to: '/' },
                    { label: t('dashboard'), to: '/dashboard' },
                ])
            }
        }
    }, [t, user.isVerified, user?.roles]);

    const services = useMemo(() => {
        let temp = {}
        Object.values(dashboard?.projects || {})?.forEach(e => {
            temp[e.code] = {
                label: e.name,
                img: e.icon,
                desc: e.desc,
                to: e.url,
            }
        })
        return temp
    }, [dashboard])

    return (
        <Header 
            isLogin={localStorage.getItem('token')}
            app={'opize'}
            projects={services}
            menus={menus}
            user={user}
            userMenus={[
                { label: t('header_user'), to: "/user" },
                { label: t('header_notice'), to: "/notice" },
                { label: t('logout'), to: "/logout" },
            ]}
            loginTo="/login"
        />
    )
}