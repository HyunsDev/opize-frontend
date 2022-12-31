import Image from 'next/image';
import Link from 'next/link';
import { ActionMenu, ActionMenuActionType, cv, Header } from 'opize-design-system';
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
    color: ${cv.text3};
`;

export function AdminHeader({ menu }: { menu: string }) {
    const { isLoading, data: user } = useQuery(['user', 'self'], () => client.user.get({ userId: 'me' }), {});
    const router = useRouter();

    const action: ActionMenuActionType[][] = [
        [
            {
                label: '대시보드로 돌아가기',
                onClick: () => router.push('/dashboard'),
            },
        ],
    ];

    return (
        <Header>
            <Header.Notice />
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
                    <Header.Nav.Button
                        as={'a'}
                        href={'https://www.notion.so/4f861031061541239ee1108dc5d61406'}
                        target={'_blank'}
                    >
                        API
                    </Header.Nav.Button>
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

                    notion: {
                        text: '노션',
                        onClick: () => router.push('/admin/notion'),
                    },
                }}
            />
        </Header>
    );
}
