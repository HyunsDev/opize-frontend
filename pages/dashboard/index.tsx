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
import LogoImg from '../../assets/opize_IconText.png';
import SkeletonIcon from '../../assets/opize_circle.png';
import { DashboardItem, DashboardItems } from '../../components/dashboard/items';

import { client } from '../../utils/opizeClient';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

function DashboardHeader({}: {}) {
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
                onClick: () => {},
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
                        <a>
                            <Image src={LogoImg} alt="" height={28} width={97} />
                        </a>
                    </Link>
                </Header.Nav.Left>
                <Header.Nav.Right>
                    <ActionMenu variant="text" borderRadius={999} width="fit-content" actions={action}>
                        <Image src={user?.imageUrl || SkeletonIcon} alt="유저 프로필 사진" width={32} height={32} />
                    </ActionMenu>
                </Header.Nav.Right>
            </Header.Nav>
            <Header.SubMenu
                selected="dashboard"
                menu={{
                    dashboard: {
                        text: '대시보드',
                        onClick: () => null,
                    },
                    info: {
                        text: '내 정보',
                        onClick: () => null,
                    },
                }}
            />
        </Header>
    );
}

export default function App() {
    const { isLoading, data: user, refetch } = useQuery(['user', 'self'], () => client.user.get({ userId: 'me' }), {});

    return (
        <>
            <DashboardHeader />
            <PageLayout backgroundColor={cv.bg_page1}>
                <DashboardItems></DashboardItems>
            </PageLayout>
        </>
    );
}
