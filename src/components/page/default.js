import styled from "styled-components";
 
const PageDivver = styled.div`
    margin: 0 auto;
    width: ${props => props.width || 600}px;
    margin-top: 100px;
    padding-bottom: 100px;
`

export default function Page(props) {
    return (
        <PageDivver width={props.width}>
            {props.children}
        </PageDivver>
    )
}