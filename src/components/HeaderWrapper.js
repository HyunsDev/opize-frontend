import { Header } from 'opize-components'

import defaultApp from '../data/opizeApp.json'
import { useTranslation } from 'react-i18next';
import { useMemo, useContext, useEffect } from "react";

import { UserContext } from "../context/user";
import { DashboardContext } from "../context/dashboard";

export function HeaderWrapper(props){
    const { user, initUser } = useContext(UserContext)
    const { dashboard, initDashboard } = useContext(DashboardContext)
    const { t, i18n } = useTranslation('translation')

    useEffect(() => {
        initUser()
    }, [initUser])

    useEffect(() => {
        initDashboard()
    }, [initDashboard])

    const services = useMemo(() => {
        let temp = {}
        Object.values(defaultApp[i18n.language]).forEach(e => {
            if (e.onlyAdmin === true) {
                if (user?.roles?.includes('admin')) {
                    temp[e.code] = {
                        label: e.label,
                        img: e.img,
                        desc: e.desc,
                        to: e.to,
                        hide: e.hide === true
                    }
                }
            } else if (e.code) {
                temp[e.code] = {
                    label: e.label,
                    img: e.img,
                    desc: e.desc,
                    to: e.to,
                    hide: e.hide === true
                }
            }
        })
        Object.values(dashboard?.projects || {})?.forEach(e => {
            temp[e.code] = {
                label: e.name,
                img: e.icon,
                desc: e.desc,
                to: e.url,
            }
        })
        return temp
    }, [i18n, dashboard, user])

    return (
        <Header 
            isLogin={localStorage.getItem('token')}
            app={props.app}
            projects={services}
            menus={[
                { label: t('blog'), to: '/blog' },
                { label: t('project'), to: '/' },
                { label: t('developer'), to: '/developer' },
            ]}
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