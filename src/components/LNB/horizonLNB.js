import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const Div = styled.div`
    border-bottom: solid 1px var(--grey1);
    align-items: center;
    display: flex;
    position: relative;
    gap: 4px;
    margin-top: 8px;
`

const ItemDivver = styled.div`
    padding-bottom: 4px;
    /* border-bottom: solid 2px ${props => props.isSelect ? "var(--grey9)" : "transparent"}; */
`

const Item = styled.div`
    padding: 4px 12px;
    cursor: pointer;
    border-radius: 8px;
    user-select: none;

    &:hover {
        background-color: var(--grey1);
    }
`

const UnderLine = styled.div`
    position: absolute;
    transition: 100ms, left 200ms cubic-bezier(0, 0.61, 0.32, 1.49);
    bottom: 0;
    left: ${props => props.left || 0}px;
    width: ${props => props.width}px;
    height: 1px;
    border-bottom: solid 2px var(--grey9);
`

export default function HorizonMenu(props) {
    const DivRef = useRef()
    const targets = useRef({})
    const [width, setWidth] = useState(0)

    useEffect(() => {
        setWidth(targets.current[props.selected]?.offsetWidth)
    },[props.selected])

    return (
        <Div ref={DivRef}>
            {
                props.menu.map(e => {
                    return (
                        <ItemDivver key={e.id} isSelect={e.id === props.selected} ref={el => targets.current[e.id] = el}>
                            <Item onClick={e.onClick}>
                                {e.text}
                            </Item>
                        </ItemDivver>
                    )
                })
            }
            <UnderLine width={width} left={targets.current[props.selected]?.getBoundingClientRect().left - DivRef.current?.getBoundingClientRect().left}/>
        </Div>
    )
}