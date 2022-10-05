import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { Button, cv, PageLayout, Span } from 'opize-design-system';
import styled, { keyframes } from 'styled-components';
import { IndexOpizeToken } from './opizeToken';
import { CaretDown } from 'phosphor-react';

const Layout = styled.div`
    width: 100%;
    margin: 0 auto;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
    position: relative;
`;

const Title = styled.h1`
    text-align: center;
    font-weight: ${cv.fontWeightSemiBold};
    font-size: 108px;
    line-height: 1.1;

    background: linear-gradient(180deg, #0f312f 0%, #3fada4 40%, #3fada4 60%, #0f312f 100%);

    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;

    &::selection {
        background: rgba(7, 56, 52, 0.2) !important;
    }

    & *::selection {
        background: rgba(7, 56, 52, 0.2) !important;
    }

    br::selection {
        background: transparent;
    }

    @media (max-width: 767px) {
        font-size: 48px;
    }
`;

const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    gap: 12px;
`;

const Button1 = styled.a`
    color: #000000;
    text-decoration: none;
    background: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    padding: 10px 32px;
    transition: 200ms;
    font-size: 14px;
    font-weight: ${cv.fontWeightRegular};

    &:hover {
        transform: translateY(-2px);
        background-color: #ffffff;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.12);
    }
`;

const Button2Animation = keyframes`
    0% {
        background-position: 0% center;
    }
    100% {
        background-position: 200% center;
    }
`;

const Button2 = styled.a`
    color: #dae7d3;
    text-decoration: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    padding: 10px 32px;
    font-size: 14px;
    font-weight: ${cv.fontWeightSemiBold};

    background: linear-gradient(90deg, #16756d 0%, #16756d 30%, #119287 60%, #16756d 100%);
    background-size: 200% auto;
    animation: ${Button2Animation} 2s infinite linear;

    transition: 200ms;

    &:hover {
        background: linear-gradient(90deg, #296561 0%, #296561 30%, #296561 60%, #296561 100%);
    }

    &:active {
        transform: translateY(2px);
    }
`;

const Label = styled.div`
    font-size: 14px;
    color: ${cv.text3};
    margin-top: 80px;
    text-align: center;
`;

const Caret = styled.div`
    position: absolute;
    bottom: 50px;
    animation: CaretAnimation 2s infinite alternate ease-in-out;

    @keyframes CaretAnimation {
        0% {
            transform: translateY(0px);
        }

        100% {
            transform: translateY(-10px);
        }
    }
`;

export function IndexMainBlock() {
    const signupBtnRef = useRef<HTMLAnchorElement>(null);
    const [isLogin, setIsLogin] = useState<boolean>();

    useEffect(() => {
        setIsLogin(!!localStorage.getItem('OpizeToken'));
    }, []);

    return (
        <Layout>
            <IndexOpizeToken />
            <Title>
                <span>더욱 편리한</span>
                <br />
                생산성 라이프
                <br />
                프로젝트
            </Title>
            <Buttons>
                {isLogin === undefined ? (
                    <></>
                ) : isLogin ? (
                    <>
                        <Link href={'/dashboard'} passHref>
                            <Button2 ref={signupBtnRef}>대시보드</Button2>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href={'/auth/login'} passHref>
                            <Button1>로그인</Button1>
                        </Link>
                        <Link href={'/auth/login'} passHref>
                            <Button2 ref={signupBtnRef}>회원가입</Button2>
                        </Link>
                    </>
                )}
            </Buttons>
            <Label>
                사소한 불편함을 해결하기 위한
                <br />
                고등학생 개발자의 프로젝트
            </Label>

            <Caret>
                <CaretDown color={cv.text4} size={32} />
            </Caret>
        </Layout>
    );
}
