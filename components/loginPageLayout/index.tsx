import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { cv } from 'opize-design-system';

import OpizeFoxImg from '../../assets/opize_fox.png';
import LogoImg from '../../assets/opize_IconText.png';

const Outer = styled.div`
    height: calc(100vh);
    max-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const Inner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`;

const LogoDiv = styled.div`
    position: absolute;
    top: 16px;
    left: 16px;
`;

const Title = styled.h1`
    margin-top: 12px;
    font-weight: 600;
    font-size: 26px;
`;

const SubTitle = styled.p`
    margin-top: 8px;
    color: ${cv.text3};
`;

const LoginBoxOuter = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const LoginBoxInner = styled.div`
    display: flex;
    flex-direction: column;
    width: 360px;
`;

const StyledBanner = styled.div`
    flex: 1;
    margin: 24px;
    border-radius: 8px;
    height: calc(100% - 48px);
    background: linear-gradient(273.59deg, #2d6560 2.96%, #3e947f 76.46%);
    position: relative;
`;

const BannerLogoFadeIn = keyframes`
    0% {
        transform: translate(20px, 0px) scaleX(-1);
        opacity: 0.4;
    }
    4% {
        transform: translate(20px, 0px) scaleX(-1);
        opacity: 0.4;
    }
    100% {
        transform: translate(0px, 0px) scaleX(-1);
        opacity: 1;
    }
`;

const BannerLogo = styled.div`
    position: absolute;
    right: 0px;
    bottom: 0px;
    user-select: none;
    height: 500px;
    width: 500px;
    border-radius: 8px;
    animation: ${BannerLogoFadeIn} 2s cubic-bezier(0.08, 0.37, 0, 1.02) forwards;

    img {
        border-radius: 8px;
    }
`;

const BannerText = styled.div`
    position: absolute;
    left: 32px;
    top: 32px;
    user-select: none;
    backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.2);
    padding: 8px;
`;

function Banner(props: {}) {
    return (
        <StyledBanner>
            <BannerText>TEXT</BannerText>
            <BannerLogo>
                <Image src={OpizeFoxImg} layout="fill" alt="" />
            </BannerLogo>
        </StyledBanner>
    );
}

export interface LoginPageLayoutProps {
    children: React.ReactNode;
    title: string;
    subTitle: string;
}

export function LoginPageLayout({ children, title, subTitle }: LoginPageLayoutProps) {
    return (
        <Outer>
            <LogoDiv>
                <Link href={'/'}>
                    <a>
                        <Image src={LogoImg} alt="" height={28} width={97} />
                    </a>
                </Link>
            </LogoDiv>

            <Inner>
                <LoginBoxOuter>
                    <LoginBoxInner>
                        <Title>{title}</Title>
                        <SubTitle>{subTitle}</SubTitle>
                        {children}
                    </LoginBoxInner>
                </LoginBoxOuter>
                <Banner />
            </Inner>
        </Outer>
    );
}
