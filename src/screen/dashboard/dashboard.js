import { useContext, useState, useEffect, useMemo } from 'react';
import { UserContext } from "../../context/user";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { DashboardContext } from '../../context/dashboard';

import Page from "../../components/page/default";
import { H1, H2 } from "../../components/title/title";
import Search from '../../components/inputs/search';
import Service from '../../components/block/service';

import defaultApp from '../../data/opizeApp.json'

const Services = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
`

export default function Dashboard(props) {
    const { user } = useContext(UserContext)
    const { dashboard, initDashboard } = useContext(DashboardContext)
    const [ searchText, setSearchText ] = useState('')
    const { t, i18n } = useTranslation('translation')

    useEffect(() => {
        document.title = `${t("dashboard")} | Opize`
    }, [t])

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
        <Page>
            <H1>{t("greet", {name: user.name})}</H1>
            <H2>{t("dashboard_subtitle")}</H2>
            <Search value={searchText} onChange={searchInput} />
            <Services>
                {
                    Object.values(services).filter(e => {
                        if (!e.showDashboard) return false
                        if (searchText === "") return true
                        if (e.name.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.desc.toUpperCase().includes(searchText.toUpperCase())) return true
                        if (e.to.toUpperCase().includes(searchText.toUpperCase())) return true
                        return false
                    }).map(e => <Service {...e} key={e.name} />)
                }
            </Services>
        </Page>
    )
}