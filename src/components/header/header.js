import styled from "styled-components"
import { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../context/user";
import defaultApp from '../../data/opizeApp.json'
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { ArrowRight } from 'phosphor-react'

import DropDown from "../dropdown/dropdown";
import { DashboardContext } from "../../context/dashboard";
import { useMemo } from "react";

const Divver = styled.div`
    display: flex;
    z-index: 10;
    box-sizing: border-box;
    width: 100%;
    height: 52px;
    justify-content: space-between;
    padding: 0px 8px;
    position: fixed;
    top: 0;
    transition: 200ms;
    border-bottom: solid 1px ${props => props.isTop ? "rgba(0,0,0,0)" : "var(--grey2)"} ;
    background-color: ${props => props.isTop ? "transparent" : "#ffffff"};
`

const Items = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    gap: 8px;
`

const MenuBtn = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 8px;
    border-radius: 8px;
    transition: 200ms;
    color: var(--grey9);
    font-size: 14px;
    
    &:hover {
        background-color: var(--greyPlaceholder)
    }
`

const LoginBtn = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 8px;
    border-radius: 8px;
    transition: 200ms;
    color: #2D6560;
    font-weight: 800;
    gap: 8px;
    font-size: 14px;

    &:hover {
        background-color: rgba(0,0,0,0.08)
    }
`

export default function Header(props) {
    const { user, initUser } = useContext(UserContext)
    const { dashboard, initDashboard } = useContext(DashboardContext)
    const { t, i18n } = useTranslation('translation')
    const [isTop, setIsTop] = useState(true)

    const onScroll = () => {
        setIsTop(window.scrollY === 0)
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    useEffect(() => {
        initUser()
    }, [initUser])

    useEffect(() => {
        initDashboard()
    }, [initDashboard])

    const services = useMemo(() => {
        let temp = defaultApp[i18n.language]
        Object.values(dashboard?.projects || {})?.forEach(e => {
            temp[e.code] = {
                name: e.name,
                img: e.icon,
                desc: e.desc,
                show: true,
                to: e.url,
            }
        })
        return temp
    }, [i18n, dashboard])

    return (
        <Divver isTop={isTop}>
            <Items>
                <DropDown {...services[props.app]} menus={Object.values(services)} />
            </Items>
            <Items>
                <MenuBtn to="/blog">{t('blog')}</MenuBtn>
                <MenuBtn to="/">{t('project')}</MenuBtn>
                <MenuBtn to="/developer">{t('developer')}</MenuBtn>
                {
                    localStorage.getItem('token') ? <DropDown direction='right' name={user.name} img={user.profileImage || ""} menus={[
                        {name: t('header_user'), to: "/user"},
                        {name: t('header_notice'), to: "/notice"},
                        {name: t('logout'), to: "/logout"},
                        ]} /> : <LoginBtn to="/login">{t('login')}<ArrowRight size={20} weight="bold" /></LoginBtn>
                }   

            </Items>
        </Divver>
    )
}