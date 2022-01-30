import axios from "axios";
import { useEffect, useState } from "react";
import { NotionRenderer } from 'react-notion-x'
import pageMap from '../../data/pageMap.json'
// import { toast } from 'react-toastify';
import styled from 'styled-components'
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from 'phosphor-react'

import OpizeLogoImg from '../../assets/opize.png'
import OpizeLogoTextImg from '../../assets/opize_text_1.png'

const Divver = styled.div`
    z-index: 10;
    box-sizing: border-box;
    width: 100%;
    height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16px;
    position: fixed;
    top: 0;
    border-bottom: solid ${props => props.isTop ? "0px" : "1px"} #E7E9EE;
    transition: 200ms;
    /* backdrop-filter: blur(2px); */
    background-color: ${props => props.isTop ? "#dae7d3" : "#ffffff"};
`

const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`

const LogosLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 8px;
`

const Logo = styled.img`
    height: 28px;
`

const LogoText = styled.img`
    height: 24px;
    margin-top: 4px;
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

const LandingHeader = () => {
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

    return (
        <Divver isTop={isTop}>
            <LogosLink to="/">
                <Logo src={OpizeLogoImg} />
                <LogoText src={OpizeLogoTextImg} />
            </LogosLink>
            <Buttons>
                <MenuBtn to="/blog">블로그</MenuBtn>
                <MenuBtn to="/project">프로젝트</MenuBtn>
                <MenuBtn to="/contact">문의</MenuBtn>
                <MenuBtn to="/developer">개발자 소개</MenuBtn>
                <LoginBtn to="/login">로그인<ArrowRight size={20} weight="bold" /></LoginBtn>
            </Buttons>
        </Divver>
    )
}

const Div = styled.div`
    position: relative;
`

const NotionRendererDiv = styled.div`
    margin-top: 52px;
`

const Notion = function (props) {
    const [page, setPage] = useState()
    const location = useLocation()
    const pageId = props.id || pageMap[location.pathname] || location.pathname

    useEffect(() => {
        (async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/notion?id=${pageId}`)
            setPage(res.data)
        })()
    },[location, pageId])

    return (
        <>
            <Div>
                <LandingHeader />
                <NotionRendererDiv>
                    {page && <NotionRenderer recordMap={page} fullPage darkMode={false} disableHeader/>}
                </NotionRendererDiv>
            </Div>
        </>
    )
}

export default Notion