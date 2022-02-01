import { Link } from "react-router-dom"
import styled from "styled-components"

const ServiceLink = styled(Link)`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    align-items: center;
    background-color: #F5F5F5;
    border-radius: 8px;
    text-decoration: none;
    gap: 16px;
    transition: 200ms;

    &:hover {
        background-color: #e5e5e5;
    }
`

const ServiceA = styled.a`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    align-items: center;
    background-color: #F5F5F5;
    border-radius: 8px;
    text-decoration: none;
    gap: 16px;
    transition: 200ms;

    &:hover {
        background-color: #e5e5e5;
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

const Info = styled.div`
    justify-content: center;
    display: flex;
    flex-direction: column;
`

const Name = styled.div`
    color: #2D2D2D;
    font-size: 24px;
    font-weight: 800;
`

const Desc = styled.div`
    color: #747474;
    font-size: 14px;
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