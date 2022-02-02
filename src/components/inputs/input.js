import styled from "styled-components";

export default styled.input`
    border-radius: 8px;
    border: solid 2px ${props => props.error ? "#e74d3d" : "#EFEFEF"};
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    transition: 200ms;
    padding: 0px 16px;
    font-size: 16px;
    color: #2d2d2d;

    &::placeholder {
        color: #9c9da7;
    }

    &:hover {
        border: solid 2px ${props => props.error ? "#e74d3d" : "#B8B8B8"};
    }

    &:focus {
        outline: 0;
        border: solid 2px ${props => props.error ? "#e74d3d" : "#747474"};
    }

    &:read-only {
        background-color: #f9f9f9;
        border: solid 2px ${props => props.error ? "#e74d3d" : "#E5E5E5"};
    }
`
