import styled from "styled-components";
import { Spinner } from '../spinner';

const ColorBtnSubmitDiv = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 14px;
    box-sizing: border-box;
    border-radius: 8px;
    background-color: #E3EEDD;
    font-weight: 800;
    user-select: none;
    transition: 200ms;
    border: 0;
    cursor: ${props => props.isLoading ? "not-allowed" : "pointer"};

    &:hover {
        background-color: #dae7d3;
    }
`

const SpinnerDiv = styled.div`
    display: flex;
    background-color: inherit;
    border-radius: 8px;
    margin-right: ${props => props.show ? 0 : -props.size*2.3}px;
    transition: 400ms;

    &:hover {
        background-color: #dae7d3;
    }

    div {
        visibility: ${props => props.show ? "visible" : "hidden"}
    }
`

const ColorBtnSubmitInput = styled.input`
    z-index: 3;
    padding: 8px 14px;
    border-radius: 8px;
    cursor: inherit;
    color: #2D6560;
    font-size: 16px;
    background-color: inherit;
    border: 0;
`

export function ColorBtnSubmit (props) {
    return (
        <>
            <ColorBtnSubmitDiv isLoading={props.isLoading}>
                <SpinnerDiv size={20} show={props.isLoading}>
                    <Spinner size={20} color="#2D6560" show={props.isLoading} />
                </SpinnerDiv>
                <ColorBtnSubmitInput show={props.isLoading} type={'submit'} value={props.text || 'text'} />
            </ColorBtnSubmitDiv>
        </>
    )
}


export function ColorBtn (props) {
    return (
        <>
            <ColorBtnSubmitDiv isLoading={props.isLoading}>
                <SpinnerDiv size={20} show={props.isLoading}>
                    <Spinner size={20} color="#2D6560" show={props.isLoading} />
                </SpinnerDiv>
                <ColorBtnSubmitInput show={props.isLoading} type={'button'} value={props.text || 'text'} onClick={props.onClick || (() => {})} />
            </ColorBtnSubmitDiv>
        </>
    )
}