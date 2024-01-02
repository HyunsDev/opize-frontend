import Image from 'next/image';
import Link from 'next/link';
import { Menu, cv, Header } from 'opize-design-system';
import LogoImg from '../../../../assets/opize_IconText.png';
import SkeletonIcon from '../../../../assets/opize_circle.png';

import { client } from '../../../../utils/opizeClient';
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

export interface AdminProjectHeaderProps {
    projectCode: string;
    menu: string;
}

export function AdminProjectHeader({ menu, projectCode }: AdminProjectHeaderProps) {
    const router = useRouter();
    const { isLoading: userLoading, data: user } = useQuery(
        ['user', 'self'],
        () => client.user.get({ userId: 'me' }),
        {}
    );
    const { isLoading: projectLoading, data: project } = useQuery(['admin', 'project', projectCode], () =>
        client.project.get({
            projectCode,
        })
    );

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
                    <Menu>
                        <Menu.Trigger variant="tertiary" shape="round" iconOnly>
                            <Image src={user?.imageUrl || SkeletonIcon} alt="유저 프로필 사진" width={32} height={32} />
                        </Menu.Trigger>
                        <Menu.Content>
                            <Menu.Option onClick={() => router.push('/admin')} size="regular">
                                관리자
                            </Menu.Option>
                            <Menu.Option onClick={() => router.push('/dashboard')} size="regular">
                                유저 대시보드
                            </Menu.Option>
                        </Menu.Content>
                    </Menu>
                </Header.Nav.Right>
            </Header.Nav>
            <Header.Menu
                selected={menu}
                tabs={[
                    {
                        value: 'overview',
                        title: '프로젝트',
                        onClick: () => router.push(`/admin/project/${projectCode}`),
                    },
                    {
                        value: 'setting',
                        title: '설정',
                        onClick: () => router.push(`/admin/project/${projectCode}/setting`),
                    },
                ]}
            />
        </Header>
    );
}
