import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Logo from '../assets/opize.png';

const Center = styled.div`
    color: var(--grey5);
    opacity: 0;
    transition: 200ms;
    position: absolute;
    top: 70px;
    left: 16px;
`

const Div = styled.div`
    width: 350px;
    height: 180px;
    background: linear-gradient(45deg, var(--grey9), var(--grey8));
    border-radius: 8px;
    box-sizing: border-box;
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;
    user-select: none;
    cursor: pointer;

    &:hover {
        ${Center} {
            opacity: 1;
        }
    }
`

const CardNum = styled.div`
    position: absolute;
    color: var(--grey0);
    font-size: 20px;
    left: 16px;
    bottom: 50px;
`

const CardInfo = styled.div`
    position: absolute;
    color: var(--grey5);
    font-size: 14px;
    left: 16px;
    bottom: 28px;
`

const Img = styled.img`
    width: 40px;
    height: 40px;
    position: absolute;
    top: 16px;
    right: 16px;
`

export function Card(props) {
    const { t } = useTranslation('translation');
    const cardNumber = props.cardNumber && `${props.cardNumber.substring(0,4)} ${props?.cardNumber.substring(4,8)} ${props?.cardNumber.substring(8,12)} ${props?.cardNumber.substring(12,16)}`

    return (
        <Div onClick={props.onClick || null}>
            <Img src={Logo} alt='opize Logo' />
            <CardNum>{props.cardCompany} {cardNumber}</CardNum>
            <CardInfo>{props.cardInfo}</CardInfo>
            <Center>{props.cardCompany ? t('user_payment_card_change') : t('user_payment_card_add')}</Center>
        </Div>
    )
}