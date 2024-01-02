import Image from 'next/image';
import Link from 'next/link';
import { Header, Menu, MenuOption } from 'opize-design-system';
import styled from 'styled-components';
import LogoImg from '../../../assets/opize_IconText.png';
import SkeletonIcon from '../../../assets/opize_circle.png';

import { useRouter } from 'next/router';
import { useUser } from '../../../hooks/useUser';

type Path = 'dashboard' | 'roadMap' | 'settings';

const A = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const logout = () => {
    localStorage.removeItem('opizeToken');
    window.location.href = '/';
};

export function DashboardHeader({ now }: { now: Path }) {
    const { user } = useUser();
    const router = useRouter();

    let action = <></>;

    if (user?.roles?.includes('admin')) {
        action = (
            <>
                <MenuOption onClick={() => router.push('/dashboard/settings')}>내 정보</MenuOption>
                <MenuOption onClick={() => logout()} color="red">
                    로그아웃
                </MenuOption>
                <MenuOption onClick={() => router.push('/admin')}>관리자</MenuOption>
            </>
        );
    } else {
        action = (
            <>
                <MenuOption onClick={() => router.push('/dashboard/settings')}>내 정보</MenuOption>
                <MenuOption onClick={() => logout()} color="red">
                    로그아웃
                </MenuOption>
            </>
        );
    }

    return (
        <Header>
            <Header.Nav>
                <Header.Nav.Left>
                    <Link href={'/dashboard'} passHref>
                        <A>
                            <Image src={LogoImg} alt="" height={28} width={97} />
                        </A>
                    </Link>
                </Header.Nav.Left>
                <Header.Nav.Right>
                    <Menu>
                        <Menu.Trigger variant="tertiary" iconOnly shape="round">
                            <Image src={user?.imageUrl || SkeletonIcon} alt="유저 프로필 사진" width={32} height={32} />
                        </Menu.Trigger>
                        <Menu.Content>{action}</Menu.Content>
                    </Menu>
                </Header.Nav.Right>
            </Header.Nav>
            <Header.Menu
                selected={now}
                tabs={[
                    {
                        title: '대시보드',
                        value: 'dashboard',
                        onClick: () => router.push('/dashboard'),
                    },
                    {
                        title: '로드맵',
                        value: 'roadMap',
                        onClick: () => router.push('/dashboard/roadmap'),
                    },
                    {
                        title: '설정',
                        value: 'settings',
                        onClick: () => router.push('/dashboard/settings'),
                    },
                ]}
            />
        </Header>
    );
}
