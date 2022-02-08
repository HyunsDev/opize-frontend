import { Link } from "react-router-dom"
import styled from "styled-components"

const Info = styled.div`
    justify-content: center;
    display: flex;
    flex-direction: column;
`

const Name = styled.div`
    color: var(--grey9);
    font-size: 24px;
    font-weight: 800;
    display: flex;
    align-items: center;
`

const Desc = styled.div`
    color: #747474;
    font-size: 14px;
`

const ServiceLink = styled(Link)`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    align-items: center;
    background-color: var(--grey1);
    border-radius: 8px;
    text-decoration: none;
    gap: 16px;
    transition: 200ms;

    &:hover {
        background-color: var(--grey2);
    }
`

const ServiceA = styled.a`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    align-items: center;
    background-color: var(--grey1);
    border-radius: 8px;
    text-decoration: none;
    gap: 16px;
    transition: 200ms;

    ${Name}::after {
        content: "↗";
        margin-left: 4px;
        color: var(--grey1);
        font-size: 24px;
        transition: 200ms;
    }

    &:hover {
        background-color: var(--grey2);

        ${Name}::after {
            color: var(--grey8);
        }
    }
`

const IconDiv = styled.div`
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    border-radius: 40px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        height: 36px;
        width: 36px
    }
`



export default function Service(props) {
    if (props.to.includes("http")) {
        return (
            <ServiceA href={props.to} target={"_blank"}>
                <IconDiv>
                    <img src={props.img} alt={props.name} />
                </IconDiv>
                <Info>
                    <Name>{props.name || "name"}</Name>
                    <Desc>{props.desc || "desc"}</Desc>
                </Info>
            </ServiceA>
        )
    } else {
        return (
            <ServiceLink to={props.to}>
                <IconDiv>
                    <img src={props.img} alt={props.name} />
                </IconDiv>
                <Info>
                    <Name>{props.name || "name"}</Name>
                    <Desc>{props.desc || "desc"}</Desc>
                </Info>
            </ServiceLink>
        )
    }


}