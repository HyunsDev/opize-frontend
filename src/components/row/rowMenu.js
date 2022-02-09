import styled from "styled-components";

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: ${props => props.marginTop}px;
`

const Left = styled.div`
    width: 250px;
    font-size: 16px;
    display: flex;
    padding-top: 8px;
`

const Right = styled.div`
    display: flex;
    justify-content: space-between;
    min-height: 40px;
    width: 100%;
    gap: 8px;
`

export default function RowMenu(props) {
    return (
        <Div marginTop={props.marginTop || 0}>
            <Left>
                {props.name || "name"}
            </Left>
            <Right>
                { props.children }
            </Right>
        </Div>
    )
}