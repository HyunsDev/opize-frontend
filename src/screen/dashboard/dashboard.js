import { useContext, useState, useEffect, useMemo } from 'react';
import { UserContext } from "../../context/user";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { DashboardContext } from '../../context/dashboard';
import { Banner, Search, Page, H1, H2 } from 'opize-components'
import defaultApp from '../../data/opizeApp.json'
import { useSearchParams } from 'react-router-dom';
import { Link } from "react-router-dom"


const Info = styled.div`
    justify-content: center;
    display: flex;
    flex-direction: column;
`

const Name = styled.div`
    color: var(--grey9);
    font-size: 24px;
    font-weight: 800;
    display: flex;
    align-items: center;
`

const Desc = styled.div`
    color: #747474;
    font-size: 14px;
`

const ServiceLink = styled(Link)`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    align-items: center;
    background-color: var(--grey1);
    border-radius: 8px;
    text-decoration: none;
    gap: 16px;
    transition: 200ms;
    &:hover {
        background-color: var(--grey2);
    }
`

const ServiceA = styled.a`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    align-items: center;
    background-color: var(--grey1);
    border-radius: 8px;
    text-decoration: none;
    gap: 16px;
    transition: 200ms;
    &:hover {
        background-color: var(--grey2);
    }
`

const IconDiv = styled.div`
    width: 60px;
    height: 60px;
    box-sizing: border-box;
    border-radius: 40px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        height: 36px;
        width: 36px
    }
`

function Service(props) {
    if (props.to.includes("http")) {
        return (
            <ServiceA href={props.to}>
                <IconDiv>
                    <img src={props.icon} alt={props.name} />
                </IconDiv>
                <Info>
                    <Name>{props.name || "name"}</Name>
                    <Desc>{props.desc || "desc"}</Desc>
                </Info>
            </ServiceA>
        )
    } else {
        return (
            <ServiceLink to={props.to}>
                <IconDiv>
                    <img src={props.icon} alt={props.name} />
                </IconDiv>
                <Info>
                    <Name>{props.name || "name"}</Name>
                    <Desc>{props.desc || "desc"}</Desc>
                </Info>
            </ServiceLink>
        )
    }
}

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

    return (
        <Page>
            <H1>{t("greet", {name: user.name})}</H1>
            <Divver>
                { dashboard?.banners && <Banner banners={dashboard?.banners.map(e => ({
                    to: e.to,
                    img: e.bannerUrl,
                }))} />}
                <Services />
            </Divver>
        </Page>
    )
}