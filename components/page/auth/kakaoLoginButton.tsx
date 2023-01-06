/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { cv } from 'opize-design-system';
import styled from 'styled-components';
import KakaoLoginLogo from '../../../assets/kakaoLoginLogo.png';

const StyledKakaoLoginButton = styled.button`
    width: 100%;
    height: 44px;
    background-color: #fee500;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    gap: 8px;
    transition: 200ms;
    color: #000000;

    &:hover {
        background-color: #f1d900;
    }
`;

export function KakaoLoginButton({
    onClick,
    children,
}: {
    onClick: (e: React.MouseEvent) => void;
    children: React.ReactNode;
}) {
    return (
        <StyledKakaoLoginButton onClick={onClick}>
            <Image src={KakaoLoginLogo} width={20} height={20} alt="" />
            {children}
        </StyledKakaoLoginButton>
    );
}
