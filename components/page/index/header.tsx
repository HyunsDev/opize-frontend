import Image from 'next/image';
import Link from 'next/link';
import { Button, cv } from 'opize-design-system';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

import OpizeLogo from '../../../assets/opize_IconText.png';

const HeaderOuter = styled.div<{ showBorder: boolean }>`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0px;
    z-index: 1;
    background-color: ${cv.background};
    transition: 200ms;
    border-bottom: solid 1px ${(props) => (props.showBorder ? cv.border : cv.background)};
`;

const Header = styled.header`
    width: 1200px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: 0px 24px;
    @media (max-width: 767px) {
        margin: 0px 4px;
    }
`;

const LogoDiv = styled.div`
    display: flex;
    align-items: center;
`;

const LogoA = styled.a`
    display: flex;
    align-items: center;
`;

const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex: 1;
    width: 100%;

    @media (max-width: 767px) {
        display: none;
    }
`;

const NavLink = styled.a<{ isSelected: boolean }>`
    font-size: 14px;
    color: ${cv.gray300};
    padding: 6px 14px;
    transition: 150ms;
    text-decoration: none;
    border-radius: 4px;

    &:hover {
        background-color: ${cv.gray100};
        color: ${cv.text};
    }

    ${(props) => props.isSelected && `color: ${cv.text}`}
`;

const ButtonDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: flex-end;
`;

export function IndexHeader({ now }: { now?: 'main' | 'developer' | 'project' | 'together' | 'roadmap' }) {
    const [isTop, setIsTop] = useState(true);
    const [isLogin, setIsLogin] = useState<boolean>();

    useEffect(() => {
        setIsLogin(!!localStorage.getItem('opizeToken'));
    }, []);

    useEffect(() => {
        const listener = () => {
            setIsTop(window.scrollY === 0);
        };

        window.addEventListener('scroll', listener);
        return () => {
            window.removeEventListener('scroll', listener);
        };
    }, []);

    return (
        <HeaderOuter showBorder={!isTop}>
            <Header>
                <LogoDiv>
                    <Link href={'/'} passHref>
                        <LogoA>
                            <Image src={OpizeLogo} width="96px" height={'28px'} alt="Opize 고고" />
                        </LogoA>
                    </Link>
                </LogoDiv>

                <Nav>
                    <NavLink href="/@developer" isSelected={now === 'developer'}>
                        개발자 소개
                    </NavLink>
                    <NavLink href="/@project" isSelected={now === 'project'}>
                        프로젝트
                    </NavLink>
                    <NavLink href="/@roadmap" isSelected={now === 'roadmap'}>
                        로드맵
                    </NavLink>
                    <NavLink href="/@together" isSelected={now === 'together'}>
                        함께하기
                    </NavLink>
                </Nav>
                <ButtonDiv>
                    {isLogin === undefined ? (
                        <></>
                    ) : isLogin ? (
                        <>
                            <Link href={'/dashboard'} passHref>
                                <Button variant="primary" as="a">
                                    대시보드
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href={'/auth/login'} passHref>
                                <Button variant="tertiary" as="a" size="small">
                                    로그인
                                </Button>
                            </Link>
                            <Link href={'/auth/signup'} passHref>
                                <Button variant="primary" as="a" size="small">
                                    회원가입
                                </Button>
                            </Link>{' '}
                        </>
                    )}
                </ButtonDiv>
            </Header>
        </HeaderOuter>
    );
}
