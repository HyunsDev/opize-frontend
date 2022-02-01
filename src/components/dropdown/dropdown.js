import styled from "styled-components"
import { Link } from "react-router-dom"
import { useState } from "react"

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
    background-color: ${props => props.isOpen ? "rgba(0,0,0,0.08)" : props.backgroundColor || "#f5f5f5"};

    img {
        height: 24px;
    }

    div {
        color: #2d2d2d;
    }

    &:hover {
        background-color: rgba(0,0,0,0.08)
    }
`

const Selector = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 40px;
    background-color: #ffffff;
    min-width: 200px;
    padding: 8px 0px;
    border: solid 1px #E7E9EE;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.08);
    overflow: hidden;
    user-select: none;
    ${props => props.direction || "left"}: 0;

    transition: transform 100ms cubic-bezier(0.84,-0.88, 0.01, 2.12), opacity 150ms;
    transform: scale(${props => props.isOpen ? 1 : 0.9});
    transform-origin: 50% top;

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
        color: #2d2d2d;
    }

    &:hover {
        background-color: rgba(0,0,0,0.08)
    }
`

export default function DropDown(props) {
    const [ isOpen, setOpen ] = useState(false)

    return (
        <SelectorDivver className={props.className || ""} onClick={() => {setOpen(!isOpen)}}>
            <NowPage isOpen={isOpen} backgroundColor={props.backgroundColor}>
                {props.img && <img src={props.img} alt="로고" />}
                <div>{props.name || "name"}</div>
            </NowPage>
            <Selector isOpen={isOpen} direction={props.direction}>
                {
                    props.menus && props.menus.map((e,i) => (
                        <SelectorItem to={e.to} key={i}>
                            {e.img && <img src={e.img} alt="" />}
                            <div>{e.name || "name"}</div>
                        </SelectorItem>   
                    ))
                }
            </Selector>
        </SelectorDivver>
    )
}