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
    width: fit-content;
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
    min-height: 40px;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: inherit;
    color: ${props => props.color};
    font-size: 15px;
    background-color: inherit;
    border: 0;
    font-weight: 800;
`

const BtnDivver = styled.div`
    padding-left: 12px;
`

export function ColorBtnSubmit (props) {
    return (
        <>
            <BtnDivver>
                <BtnSubmitDiv isLoading={props.isLoading} backgroundColor="var(--teal5)" backgroundColorHover="var(--teal6)">
                    <SpinnerDiv size={20} show={props.isLoading} backgroundColor={"var(--teal5)"}>
                        <Spinner size={20} color="white" show={props.isLoading} />
                    </SpinnerDiv>
                    <BtnSubmitInput show={props.isLoading} type={'submit'} value={props.text || 'text'} color="white" />
                </BtnSubmitDiv>
            </BtnDivver>
        </>
    )
}


export function ColorBtn (props) {
    return (
        <>
            <BtnDivver>
                <BtnSubmitDiv isLoading={props.isLoading} backgroundColor={"var(--teal5)"} backgroundColorHover="var(--teal6)">
                    <SpinnerDiv size={20} show={props.isLoading} backgroundColor={"var(--teal5)"}>
                        <Spinner size={20} color="white" show={props.isLoading} />
                    </SpinnerDiv>
                    <BtnSubmitInput show={props.isLoading} type={'button'} value={props.text || 'text'} onClick={props.onClick || (() => {})} color="white" />
                </BtnSubmitDiv>
            </BtnDivver>
            
        </>
    )
}

export function BtnSubmit (props) {
    return (
        <>
            <BtnDivver>
                <BtnSubmitDiv isLoading={props.isLoading} backgroundColor={props.background || "var(--grey3)"} backgroundColorHover={props.backgroundHover || "var(--grey4)"}>
                    <SpinnerDiv size={20} show={props.isLoading}>
                        <Spinner size={20} color={props.color || "var(--grey9)"} show={props.isLoading} />
                    </SpinnerDiv>
                    <BtnSubmitInput show={props.isLoading} type={'submit'} value={props.text || 'text'} color={props.color || "var(--grey9)"} />
                </BtnSubmitDiv>
            </BtnDivver>
        </>
    )
}

export function Btn (props) {
    return (
        <>
            <BtnDivver>
                <BtnSubmitDiv isLoading={props.isLoading} backgroundColor={props.background || "var(--grey3)"} backgroundColorHover={props.backgroundHover || "var(--grey4)"}>
                    <SpinnerDiv size={20} show={props.isLoading}>
                        <Spinner size={20} color={props.color || "var(--grey9)"} show={props.isLoading} />
                    </SpinnerDiv>
                    <BtnSubmitInput show={props.isLoading} type={'button'} value={props.text || 'text'} onClick={props.onClick || (() => {})} color={props.color || "var(--grey9)"} />
                </BtnSubmitDiv>
            </BtnDivver>
        </>
    )
}