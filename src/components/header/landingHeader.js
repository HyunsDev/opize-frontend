import { useEffect, useState } from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { ArrowRight } from 'phosphor-react'
import { useTranslation } from 'react-i18next';
import services from '../../data/opizeApp.json'

import DropDown from "../dropdown/dropdown";

const Divver = styled.div`
    z-index: 10;
    box-sizing: border-box;
    width: 100%;
    height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 8px;
    position: fixed;
    top: 0;
    border-bottom: solid ${props => props.isTop ? "0px" : "1px"} #E7E9EE;
    transition: 200ms;
    /* backdrop-filter: blur(2px); */
    background-color: ${props => props.isTop ? "transparent" : "#ffffff"};
`

const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
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

const MenuBtn = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 8px;
    border-radius: 8px;
    transition: 200ms;
    color: #2d2d2d;
    font-size: 14px;
    
    &:hover {
        background-color: rgba(0,0,0,0.08)
    }
`

export default function LandingHeader() {
    const [isTop, setIsTop] = useState(true)
    const { t, i18n } = useTranslation('translation')

    const onScroll = () => {
        setIsTop(window.scrollY === 0)
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    return (
        <Divver isTop={isTop}>
            <DropDown backgroundColor="rgba(0,0,0,0)" name="Opize" img="/opize.png" menus={Object.values(services[i18n.language])} />
            <Buttons>
                <MenuBtn to="/blog">{t('blog')}</MenuBtn>
                <MenuBtn to="/">{t('project')}</MenuBtn>
                <MenuBtn to="/developer">{t('developer')}</MenuBtn>
                {localStorage.getItem('token') ?
                    <LoginBtn to="/dashboard">{t('dashboard')}<ArrowRight size={20} weight="bold" /></LoginBtn> : 
                    <LoginBtn to="/login">{t('login')}<ArrowRight size={20} weight="bold" /></LoginBtn>}
            </Buttons>
        </Divver>
    )
}