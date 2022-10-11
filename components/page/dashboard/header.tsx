import Image from 'next/image';
import Link from 'next/link';
import {
    ActionMenu,
    ActionMenuActionType,
    Button,
    cv,
    Header,
    PageLayout,
    Spacer,
    useTopLoading,
} from 'opize-design-system';
import styled from 'styled-components';
import LogoImg from '../../../assets/opize_IconText.png';
import SkeletonIcon from '../../../assets/opize_circle.png';
import { DashboardItem, DashboardItems } from './items';

import { client } from '../../../utils/opizeClient';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

type Path = 'dashboard' | 'roadMap' | 'settings';

const A = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const logout = () => {
    localStorage.removeItem('opizeToken');
    window.location.href = '/'
}

export function DashboardHeader({ now }: { now: Path }) {
    const { isLoading, data: user, refetch } = useQuery(['user', 'self'], () => client.user.get({ userId: 'me' }), {});
    const router = useRouter();

    const action: ActionMenuActionType[][] = [
        [
            {
                label: '내 정보',
                onClick: () => {},
            },
        ],
        [
            {
                label: '로그아웃',
                color: 'red',
                onClick: () => logout(),
            },
        ],
    ];

    if (user?.roles?.includes('admin')) {
        action.unshift([
            {
                label: '관리자',
                onClick: () => router.push('/admin'),
            },
        ]);
    }

    return (
        <Header>
            <Header.Notice />
            <Header.Nav>
                <Header.Nav.Left>
                    <Link href={'/app'}>
                        <A>
                            <Image src={LogoImg} alt="" height={28} width={97} />
                        </A>
                    </Link>
                </Header.Nav.Left>
                <Header.Nav.Right>
                    <ActionMenu
                        variant="text"
                        borderRadius={999}
                        width="fit-content"
                        actions={action}
                        icon={
                            <Image src={user?.imageUrl || SkeletonIcon} alt="유저 프로필 사진" width={32} height={32} />
                        }
                    ></ActionMenu>
                </Header.Nav.Right>
            </Header.Nav>
            <Header.SubMenu
                selected={now}
                menu={{
                    dashboard: {
                        text: '대시보드',
                        onClick: () => router.push('/dashboard'),
                    },
                    roadMap: {
                        text: '로드맵',
                        onClick: () => router.push('/dashboard/roadmap'),
                    },
                    settings: {
                        text: '설정',
                        onClick: () => router.push('/dashboard/settings'),
                    },
                }}
            />
        </Header>
    );
}
