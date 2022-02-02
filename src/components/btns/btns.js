import styled from "styled-components";
import { Spinner } from '../spinner';



const BtnSubmitDiv = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 14px;
    box-sizing: border-box;
    border-radius: 8px;
    background-color: ${props => props.backgroundColor};
    font-weight: 800;
    user-select: none;
    transition: 200ms;
    min-height: 40px;
    border: 0;
    cursor: ${props => props.isLoading ? "not-allowed" : "pointer"};

    &:hover {
        background-color: ${props => props.backgroundColorHover};
    }
`

const SpinnerDiv = styled.div`
    display: flex;
    background-color: inherit;
    border-radius: 8px;
    transition: margin-right 400ms;
    margin-right: ${props => props.show ? 0 : -props.size*2.3}px;
 
    div {
        visibility: ${props => props.show ? "visible" : "hidden"}
    }
`

const BtnSubmitInput = styled.input`
    z-index: 3;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: inherit;
    color: ${props => props.color};
    font-size: 16px;
    background-color: inherit;
    border: 0;
`

const BtnDivver = styled.div`
    padding-left: 12px;
`

export function ColorBtnSubmit (props) {
    return (
        <>
            <BtnDivver>
                <BtnSubmitDiv isLoading={props.isLoading} backgroundColor="#E3EEDD" backgroundColorHover="#dae7d3">
                    <SpinnerDiv size={20} show={props.isLoading} backgroundColor={"#E3EEDD"}>
                        <Spinner size={20} color="#2D6560" show={props.isLoading} />
                    </SpinnerDiv>
                    <BtnSubmitInput show={props.isLoading} type={'submit'} value={props.text || 'text'} color="#2D6560" />
                </BtnSubmitDiv>
            </BtnDivver>
        </>
    )
}


export function ColorBtn (props) {
    return (
        <>
            <BtnDivver>
                <BtnSubmitDiv isLoading={props.isLoading} backgroundColor={"#E3EEDD"} backgroundColorHover="#dae7d3">
                    <SpinnerDiv size={20} show={props.isLoading} backgroundColor={"#E3EEDD"}>
                        <Spinner size={20} color="#2D6560" show={props.isLoading} />
                    </SpinnerDiv>
                    <BtnSubmitInput show={props.isLoading} type={'button'} value={props.text || 'text'} onClick={props.onClick || (() => {})} color="#2D6560" />
                </BtnSubmitDiv>
            </BtnDivver>
            
        </>
    )
}

export function BtnSubmit (props) {
    return (
        <>
            <BtnDivver>
                <BtnSubmitDiv isLoading={props.isLoading} backgroundColor={props.background || "#EFEFEF"} backgroundColorHover={props.backgroundHover || "#e5e5e5"}>
                    <SpinnerDiv size={20} show={props.isLoading}>
                        <Spinner size={20} color={props.color || "#2D2D2D"} show={props.isLoading} />
                    </SpinnerDiv>
                    <BtnSubmitInput show={props.isLoading} type={'submit'} value={props.text || 'text'} color={props.color || "#2D2D2D"} />
                </BtnSubmitDiv>
            </BtnDivver>
        </>
    )
}

export function Btn (props) {
    return (
        <>
            <BtnDivver>
                <BtnSubmitDiv isLoading={props.isLoading} backgroundColor={props.background || "#EFEFEF"} backgroundColorHover={props.backgroundHover || "#e5e5e5"}>
                    <SpinnerDiv size={20} show={props.isLoading}>
                        <Spinner size={20} color={props.color || "#2D2D2D"} show={props.isLoading} />
                    </SpinnerDiv>
                    <BtnSubmitInput show={props.isLoading} type={'button'} value={props.text || 'text'} onClick={props.onClick || (() => {})} color={props.color || "#2D2D2D"} />
                </BtnSubmitDiv>
            </BtnDivver>
        </>
    )
}