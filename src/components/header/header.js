import styled from "styled-components"
import { useContext, useEffect } from 'react';
import { UserContext } from "../../context/user";

import DropDown from "../dropdown/dropdown";

import opizeLogo from '../../assets/opize.png'

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
`

const UserDiv = styled.div`

`

export default function Header(props) {
    const { user, initUser } = useContext(UserContext)

    useEffect(() => {
        initUser()
    }, [initUser])

    return (
        <Divver>
            <Items>
                <DropDown name="대시보드" img={opizeLogo} menus={[
                    {name: "첫 화면", img: opizeLogo, to: "/"}
                ]} />
            </Items>
            <Items>
                <UserDiv>
                    <DropDown direction='right' name={user.name} img={user.profileImage || ""} menus={[
                        {name: "내 정보", to: "/user"},
                        {name: "공지 & 업데이트", to: "/notice"},
                    ]} />
                </UserDiv>
                
            </Items>
        </Divver>
    )
}