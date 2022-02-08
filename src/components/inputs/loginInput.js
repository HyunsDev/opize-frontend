import styled from "styled-components"

const LoginDiv = styled.div`
    width: 100%;
`

const Name = styled.div`
    color: #747474;
    font-size: 14px;
    margin-bottom: 8px;
`

const Input = styled.input`
    border-radius: 8px;
    outline: solid 2px ${props => props.error ? "var(--red9)" : "var(--grey2)"};
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    transition: 200ms;
    padding: 0px 16px;
    font-size: 16px;
    border: 0;
    color: var(--grey9);

    &:hover {
        outline: solid 2px ${props => props.error ? "var(--red9)" : "var(--teal1)"};
    }

    &:focus {
        outline: solid 2px ${props => props.error ? "var(--red9)" : "var(--teal4)"};
    }
`

const Label = styled.div`
    height: 20px;
    color: ${props => props.error ? "var(--red9)" :"#2D6560"};
    font-size: 14px;
    margin-top: 4px;
`

export default function Login (props) {

    return (
        <LoginDiv>
            <Name>{props.name || "name"}</Name>
            <Input type={props.type || "text"} autoComplete={props.autoComplete || "on"} error={props.error} value={props.value} onChange={props.onChange || (() => {})} />
            <Label error={props.error}>{props.error?.message}</Label>
        </LoginDiv>
    )
}