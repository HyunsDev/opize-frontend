import styled from "styled-components"
import { useContext, useEffect } from 'react';
import { UserContext } from "../../context/user";
import services from '../../data/opizeApp.json'
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import DropDown from "../dropdown/dropdown";

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
    border-bottom: solid ${props => props.isTop ? "0px" : "1px"} #E7E9EE;
    transition: 200ms;
    /* backdrop-filter: blur(2px); */
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
    color: #2d2d2d;
    font-size: 14px;
    
    &:hover {
        background-color: rgba(0,0,0,0.08)
    }
`

export default function Header(props) {
    const { user, initUser } = useContext(UserContext)
    const { t, i18n } = useTranslation('translation')

    useEffect(() => {
        initUser()
    }, [initUser])

    return (
        <Divver>
            <Items>
                <DropDown {...services[i18n.language][props.app]} menus={Object.values(services[i18n.language])} />
            </Items>
            <Items>
                <MenuBtn to="/blog">{t('blog')}</MenuBtn>
                <MenuBtn to="/">{t('project')}</MenuBtn>
                <MenuBtn to="/developer">{t('developer')}</MenuBtn>
                <DropDown direction='right' name={user.name} img={user.profileImage || ""} menus={[
                    {name: t('header_user'), to: "/user"},
                    {name: t('header_notice'), to: "/notice"},
                ]} />
            </Items>
        </Divver>
    )
}