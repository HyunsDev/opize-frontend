import styled from "styled-components"

const BtnDiv = styled.div`
    padding: 8px 14px;
    box-sizing: border-box;
    border-radius: 8px;
    background-color: #F5F5F5;
    font-weight: 800;
    color: #2D2D2D;
    user-select: none;
    transition: 200ms;
    cursor: pointer;

    &:hover {
        background-color: #EFEFEF;
    }
`

export function Btn (props) {
    return (
        <>
            <BtnDiv onClick={props.onClick || (() => {})}>
                {props.text || "text"}
            </BtnDiv>
        </>
    )
}

const ColorBtnDiv = styled(BtnDiv)`
    background-color: #E3EEDD;
    color: #2D6560;
    &:hover {
        background-color: #dae7d3;
    }
`

export function ColorBtn (props) {
    return (
        <>
            <ColorBtnDiv onClick={props.onClick || (() => {})}>
                {props.text || "text"}
            </ColorBtnDiv>
        </>
    )
}

export const ColorBtnSubmit = styled.input`
    padding: 8px 14px;
    box-sizing: border-box;
    border-radius: 8px;
    background-color: #E3EEDD;
    font-weight: 800;
    font-size: 16px;
    color: #2D6560;
    user-select: none;
    transition: 200ms;
    border: 0;
    cursor: pointer;

    &:hover {
        background-color: #dae7d3;
    }
`