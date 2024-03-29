import Image from 'next/image';
import Link from 'next/link';
import { cv, Header, Menu } from 'opize-design-system';
import LogoImg from '../../../assets/opize_IconText.png';
import SkeletonIcon from '../../../assets/opize_circle.png';

import { client } from '../../../utils/opizeClient';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const TitleLogoA = styled.a`
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    font-size: 14px;
    color: ${cv.gray500};
`;

export function AdminHeader({ menu }: { menu: string }) {
    const { isLoading, data: user } = useQuery(['user', 'self'], () => client.user.get({ userId: 'me' }), {});
    const router = useRouter();

    return (
        <Header>
            <Header.Nav>
                <Header.Nav.Left>
                    <Link href={'/admin'} passHref>
                        <TitleLogoA>
                            <Image src={LogoImg} alt="" height={28} width={97} />
                            Admin
                        </TitleLogoA>
                    </Link>
                </Header.Nav.Left>
                <Header.Nav.Right>
                    <Header.Nav.A href={'https://www.notion.so/4f861031061541239ee1108dc5d61406'} target={'_blank'}>
                        API
                    </Header.Nav.A>
                    <Menu>
                        <Menu.Trigger variant="tertiary" iconOnly shape="round" width="fit-content">
                            <Image src={user?.imageUrl || SkeletonIcon} alt="유저 프로필 사진" width={32} height={32} />
                        </Menu.Trigger>
                        <Menu.Content>
                            <Menu.Option onClick={() => router.push('/dashboard')} size="regular">
                                대시보드로 돌아가기
                            </Menu.Option>
                        </Menu.Content>
                    </Menu>
                </Header.Nav.Right>
            </Header.Nav>
            <Header.Menu
                selected={menu}
                tabs={[
                    {
                        value: 'admin',
                        title: '대시보드',
                        onClick: () => router.push('/admin'),
                    },
                    {
                        value: 'project',
                        title: '프로젝트',
                        onClick: () => router.push('/admin/project'),
                    },

                    {
                        title: '노션',
                        value: 'notion',
                        onClick: () => router.push('/admin/notion'),
                    },
                ]}
            />
        </Header>
    );
}
