import { useContext, useState, useEffect, useMemo } from 'react';
import { UserContext } from "../../context/user";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { DashboardContext } from '../../context/dashboard';
import { Banner, Search, Service, Page, H1, H2 } from 'opize-components'
import defaultApp from '../../data/opizeApp.json'
import { useSearchParams } from 'react-router-dom';

const Divver = styled.div`
    margin-top: 8px;
`

const ServicesDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Services = (props) => {
    const { dashboard } = useContext(DashboardContext)
    const [ searchText, setSearchText ] = useState('')
    const { t, i18n } = useTranslation('translation')

    const searchInput = (e) => {
        setSearchText(e.target.value)
    }

    const services = useMemo(() => {
        let temp = defaultApp[i18n.language]
        Object.values(dashboard?.projects || {})?.forEach(e => {
            temp[e.code] = {
                name: e.name,
                img: e.icon,
                desc: e.desc,
                show: true,
                showDashboard: true,
                to: e.url,
            }
        })
        return temp
    }, [i18n, dashboard])

    return (
        <>
            <H2>{t("dashboard_subtitle")}</H2>
            <ServicesDiv>
                <Search key="search" value={searchText} onChange={searchInput} />
                {
                    Object.values(services).filter(e => {
                        if (!e.showDashboard) return false
                        if (searchText === "") return true
                        if (e.name.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.desc.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.to.toUpperCase().includes(searchText.toUpperCase())) return true
                        return false
                    }).map(e => <Service {...e} icon={e.img} key={e.name} />)
                }
            </ServicesDiv>
        </>
    )
}

export default function Dashboard(props) {
    const { user } = useContext(UserContext)
    const { dashboard } = useContext(DashboardContext)
    const [ searchParams ] = useSearchParams()
    const { t } = useTranslation('translation')

    useEffect(() => {
        document.title = `${t("dashboard")} - Opize`
    }, [t])

    // 서브 도메인 인증
    useEffect(() => {
        if (searchParams.get('projectGet') && user.isVerified) {
            const project = dashboard.projects[searchParams.get('projectGet')]
            if (project) {
                window.location.href=`${project.url}/verify?token=${localStorage.getItem('token')}`
            }   
        }
    }, [user, searchParams])

    return (
        <Page>
            <H1>{t("greet", {name: user.name})}</H1>
            <Divver>
                <Banner banners={dashboard.banners} />
                <Services />
            </Divver>
        </Page>
    )
}