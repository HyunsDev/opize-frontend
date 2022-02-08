import styled from "styled-components";

export default styled.input`
    border-radius: 8px;
    border: solid 2px ${props => props.error ? "var(--red9)" : "var(--grey2)"};
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    transition: 200ms;
    padding: 0px 16px;
    font-size: 16px;
    color: var(--grey9);

    &::placeholder {
        color: #9c9da7;
    }

    &:hover {
        border: solid 2px ${props => props.error ? "var(--red9)" : "var(--teal1)"};
    }

    &:focus {
        outline: 0;
        border: solid 2px ${props => props.error ? "var(--red9)" : "var(--teal4)"};
    }

    &:read-only {
        background-color: var(--grey1);
        border: solid 2px ${props => props.error ? "var(--red9)" : "var(--grey4)"};
    }
`
