import Image from 'next/image';
import { Menu, Footer, useColorTheme } from 'opize-design-system';
import { Sun, Moon } from '@phosphor-icons/react';
import styled from 'styled-components';
import LogoText from '../../../assets/opize_IconText.png';

const StyledLogo = styled.div`
    width: 120px;
    height: 60px;
`;

export function AdminFooter() {
    const { setColorTheme, nowColorTheme, colorTheme } = useColorTheme();

    return (
        <Footer>
            <Footer.Nav>
                <Footer.Nav.Item>
                    <Footer.Nav.Title>소개</Footer.Nav.Title>
                    <Footer.Nav.A href="/">소개</Footer.Nav.A>
                    <Footer.Nav.A href="/">도움말</Footer.Nav.A>
                </Footer.Nav.Item>

                <Footer.Nav.Item>
                    <Footer.Nav.Title>블로그</Footer.Nav.Title>
                    <Footer.Nav.A href="/">Opize 블로그</Footer.Nav.A>
                    <Footer.Nav.A href="/">개발자 블로그</Footer.Nav.A>
                </Footer.Nav.Item>

                <Footer.Nav.Item>
                    <Footer.Nav.Title>이용 및 약관</Footer.Nav.Title>
                    <Footer.Nav.A href="/">개인정보 처리방침</Footer.Nav.A>
                    <Footer.Nav.A href="/">서비스 약관</Footer.Nav.A>
                </Footer.Nav.Item>

                <Footer.Nav.Item>
                    <Footer.Nav.Title>개발</Footer.Nav.Title>
                    <Footer.Nav.A href="/">개발자</Footer.Nav.A>
                    <Footer.Nav.A href="/">API</Footer.Nav.A>
                    <Footer.Nav.A href="https://design.hyuns.dev">디자인 시스템</Footer.Nav.A>
                    <Footer.Nav.A href="/">브랜드 리소스</Footer.Nav.A>
                </Footer.Nav.Item>
            </Footer.Nav>
            <Footer.Menu>
                <Footer.Menu.Item>
                    <StyledLogo>
                        <Image src={LogoText} width={120} height={36} alt="" />
                    </StyledLogo>
                </Footer.Menu.Item>
                <Footer.Menu.Item>{''}</Footer.Menu.Item>
                <Footer.Menu.Item>
                    © 2024 Opize Corp. <br />
                    오피즈 | 박현우
                </Footer.Menu.Item>
            </Footer.Menu>
        </Footer>
    );
}
