import Image from 'next/image';
import Link from 'next/link';
import { ActionMenu, ActionMenuActionType, Header } from 'opize-design-system';
import LogoImg from '../../../assets/opize_IconText.png';
import SkeletonIcon from '../../../assets/opize_circle.png';

import { client } from '../../../utils/opizeClient';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

export function AdminHeader({ menu }: { menu: string }) {
    const { isLoading, data: user, refetch } = useQuery(['user', 'self'], () => client.user.get({}), {});
    const router = useRouter();

    const action: ActionMenuActionType[][] = [
        [
            {
                label: '대시보드',
                onClick: () => router.push('/admin'),
            },
        ],
        [
            {
                label: '프로젝트',
                color: 'red',
                onClick: () => router.push('/admin/project'),
            },
        ],
    ];

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
                selected={menu}
                menu={{
                    admin: {
                        text: '대시보드',
                        onClick: () => router.push('/admin'),
                    },
                    project: {
                        text: '프로젝트',
                        onClick: () => router.push('/admin/project'),
                    },
                }}
            />
        </Header>
    );
}
