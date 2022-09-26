import Image from 'next/image';
import { Footer } from 'opize-design-system';
import styled from 'styled-components';
import LogoText from '../../../assets/opize_IconText.png';

const StyledLogo = styled.div`
    width: 120px;
    height: 60px;
`;

export function AdminFooter() {
    return (
        <Footer>
            <Footer.Navigation>
                <Footer.Navigation.Item>
                    <Footer.Navigation.Item.Title>소개</Footer.Navigation.Item.Title>
                    <Footer.Navigation.Item.Link to="/">소개</Footer.Navigation.Item.Link>
                    <Footer.Navigation.Item.Link to="/">도움말</Footer.Navigation.Item.Link>
                </Footer.Navigation.Item>

                <Footer.Navigation.Item>
                    <Footer.Navigation.Item.Title>블로그</Footer.Navigation.Item.Title>
                    <Footer.Navigation.Item.Link to="/">Opize 블로그</Footer.Navigation.Item.Link>
                    <Footer.Navigation.Item.Link to="/">개발자 블로그</Footer.Navigation.Item.Link>
                </Footer.Navigation.Item>

                <Footer.Navigation.Item>
                    <Footer.Navigation.Item.Title>이용 및 약관</Footer.Navigation.Item.Title>
                    <Footer.Navigation.Item.Link to="/">개인정보 처리방침</Footer.Navigation.Item.Link>
                    <Footer.Navigation.Item.Link to="/">서비스 약관</Footer.Navigation.Item.Link>
                </Footer.Navigation.Item>

                <Footer.Navigation.Item>
                    <Footer.Navigation.Item.Title>개발</Footer.Navigation.Item.Title>
                    <Footer.Navigation.Item.Link to="/">개발자</Footer.Navigation.Item.Link>
                    <Footer.Navigation.Item.Link to="/">API</Footer.Navigation.Item.Link>
                    <Footer.Navigation.Item.Link to="https://design.hyuns.dev">
                        디자인 시스템
                    </Footer.Navigation.Item.Link>
                    <Footer.Navigation.Item.Link to="/">브랜드 리소스</Footer.Navigation.Item.Link>
                </Footer.Navigation.Item>
            </Footer.Navigation>
            <Footer.Menu>
                <Footer.Menu.Item>
                    <StyledLogo>
                        <Image src={LogoText} width={120} height={36} alt="" />
                    </StyledLogo>
                </Footer.Menu.Item>
                <Footer.Menu.Item>{''}</Footer.Menu.Item>
                <Footer.Menu.Item>{''}</Footer.Menu.Item>
                <Footer.Menu.Item>
                    © 2022 Opize Corp. <br />
                    오피즈 | 박현우
                </Footer.Menu.Item>
            </Footer.Menu>
        </Footer>
    );
}
