import { cv, PageLayout } from 'opize-design-system';
import { DashboardItems } from '../../components/page/dashboard/items';

import { client } from '../../utils/opizeClient';
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
            <PageLayout backgroundColor={cv.background}>
                <DashboardItems></DashboardItems>
            </PageLayout>
        </>
    );
}
