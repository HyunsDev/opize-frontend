import styled from "styled-components"
import { Link } from "react-router-dom"
import { useState, useContext } from "react";
import { UserContext } from "../../context/user";

const SelectorDivver = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;
`

const NowPage = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 8px;
    text-decoration: none;
    transition: 200ms;
    position: relative;
    cursor: pointer;
    user-select: none;
    background-color: ${props => props.isOpen ? "var(--grey2)" : props.backgroundColor || "var(--grey1)"};

    img {
        height: 24px;
    }

    div {
        color: var(--grey9);
    }

    &:hover {
        background-color: var(--grey2)
    }
`

const Selector = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 40px;
    background-color: #ffffff;
    min-width: 200px;
    padding: 8px 0px;
    border: solid 1px var(--grey3);
    border-radius: 8px;
    box-shadow: var(--box-shadow);
    overflow: hidden;
    user-select: none;
    ${props => props.direction || "left"}: 0;
    visibility : ${props => props.isOpen ? 'visible' : 'hidden'};

    transition: transform 100ms cubic-bezier(0.84,-0.88, 0.01, 2.12), opacity 150ms;
    transform: scale(${props => props.isOpen ? 1 : 0.9});
    transform-origin: ${props => props.direction || "left"} top;

    opacity: ${props => props.isOpen ? 1 : 0};
`

const SelectorItem = styled(Link)`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    text-decoration: none;
    transition: 200ms;

    img {
        height: 24px;
    }

    div {
        color: var(--grey9);
    }

    &:hover {
        background-color: var(--grey1);
    }
`

const SelectorItemA = styled.a`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    text-decoration: none;
    transition: 200ms;

    img {
        height: 24px;
    }

    div {
        color: var(--grey9);
    }

    &:hover {
        background-color: var(--grey1);
    }
`

export default function DropDown(props) {
    const [ isOpen, setOpen ] = useState(false)
    const { user } = useContext(UserContext)

    return (
        <SelectorDivver className={props.className || ""} onClick={() => {setOpen(!isOpen)}}>
            <NowPage isOpen={isOpen} backgroundColor={props.backgroundColor}>
                {props.img && <img src={props.img} alt="로고" />}
                <div>{props.name || "name"}</div>
            </NowPage>
            <Selector isOpen={isOpen} direction={props.direction}>
                {
                    props.menus && props.menus.map((e,i) => {
                        if (e.show === false) return null
                        if (e.onlyAdmin && !user.isAdmin) return null
                        if (e.to.includes("http")) {
                            return (
                                <SelectorItemA href={e.to} key={i} target={"_blank"}>
                                    {e.img && <img src={e.img} alt="" />}
                                    <div>{e.name || "name"}</div>
                                </SelectorItemA>   
                            )
                        } else {
                            return (
                                <SelectorItem to={e.to} key={i}>
                                    {e.img && <img src={e.img} alt="" />}
                                    <div>{e.name || "name"}</div>
                                </SelectorItem>   
                            )
                        }
                    })
                }
            </Selector>
        </SelectorDivver>
    )
}