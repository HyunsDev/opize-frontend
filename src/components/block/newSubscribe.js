import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const ProjectDiv = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
    background-color: var(--grey1);
    border-radius: 8px;
    text-decoration: none;
    transition: 200ms;
`

const Info = styled.div`
    justify-content: center;
    display: flex;
    flex-direction: column;
`

const InfoDesc =styled.div`
    color: var(--grey6);
    font-size: 14px;
`

const Name = styled.div`
    color: var(--grey9);
    font-size: 20px;
    font-weight: 800;
    display: flex;
    align-items: center;

    span {
        margin-left: 4px;
        color: var(--teal5);
        font-size: 14px;
    }
`

const IconDiv = styled.div`
    width: 52px;
    height: 52px;
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
const ProjectInfo = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    gap: 16px;
    transition: 200ms;
    padding: 20px;
    border-radius: 8px 8px 0px 0px;
    /* &:hover {
        background-color: var(--grey2);
    } */
`

export default function Subscribe(props) {
    return (
        <ProjectDiv>
            <ProjectInfo>
                <IconDiv>
                    <img src={props.icon} alt={props.name} />
                </IconDiv>
                <Info>
                    <Name>{props.name}</Name>
                    <InfoDesc>{props.desc}</InfoDesc>
                </Info>
            </ProjectInfo>
        </ProjectDiv>
    )
}