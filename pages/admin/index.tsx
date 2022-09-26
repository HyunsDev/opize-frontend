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
import { toast } from 'react-toastify';
import { AdminHeader } from '../../components/page/admin/AdminHeader';

export default function App() {
    const { isLoading, data: user, refetch } = useQuery(['user'], () => client.user.get({ userId: 'me' }), {});
    const router = useRouter();

    if (!isLoading && !user?.roles?.includes('admin')) {
        toast.warn('접근 권한이 없어요.');
        router.push('/dashboard');
    }

    return (
        <>
            <AdminHeader menu="admin" />
            <PageLayout backgroundColor={cv.bg_page1}>
                <DashboardItems></DashboardItems>
            </PageLayout>
        </>
    );
}
