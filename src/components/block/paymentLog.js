import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from "dayjs";
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../context/user';
import { Receipt } from 'phosphor-react';
import instance from '../../src/instance';
import { toast } from 'react-toastify';

const ProjectDiv = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    background-color: ${props => props.status === "unsubscribed" ? 'var(--red1)' : 'var(--grey1)'};
    border-radius: 8px;
    text-decoration: none;
    transition: 200ms;
    justify-content: space-between;
    padding: 20px;
    border-radius: 8px;
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
    /* &:hover {
        background-color: var(--grey2);
    } */
`

const Right = styled.div`
    width: 100%;
    display: flex;
    gap: 8px;
`

const PlanInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: right;
`

const PlanName = styled.div`
    color: var(--grey9);
    font-weight: 800;
`

const NextPayment = styled.div`
    font-size: 14px;
    color: var(--grey7);
`

const ReceiptA = styled.a`
    min-width: 52px;
    min-height: 52px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 100%;
    transition: 200ms;
    
    &:hover {
        background-color: var(--greyPlaceholder)
    }
`

export default function PaymentLog(props) {
    return (
        <ProjectDiv status={props.status}>
            <ProjectInfo>
                <IconDiv>
                    <img src={props?.project?.icon} alt={props?.project?.name} />
                </IconDiv>
                <Info>
                    <Name>{props?.project?.name}</Name>
                    <InfoDesc>{props?.project?.desc}</InfoDesc>
                </Info>
            </ProjectInfo>
            <Right>
                <PlanInfo>
                    <PlanName>{props?.product?.name}</PlanName>
                    <NextPayment>{new Date(props?.approvedAt).toLocaleString()}</NextPayment>
                </PlanInfo>
                <ReceiptA href={props.receiptUrl} target="_blank"><Receipt size={32} color="var(--teal5)" /></ReceiptA>
            </Right>
        </ProjectDiv>
    )
}