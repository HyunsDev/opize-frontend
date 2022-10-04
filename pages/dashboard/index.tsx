import { cv, PageLayout } from 'opize-design-system';
import { DashboardItems } from '../../components/page/dashboard/items';

import { client } from '../../utils/opizeClient';
import { useQuery } from 'react-query';
import { DashboardHeader } from '../../components/page/dashboard/header';
import { DashboardFooter } from '../../components/page/dashboard/footer';

export default function App() {
    const { isLoading, data: user, refetch } = useQuery(['user', 'self'], () => client.user.get({ userId: 'me' }), {});

    return (
        <>
            <DashboardHeader now="dashboard" />
            <PageLayout backgroundColor={cv.bg_page1}>
                <DashboardItems></DashboardItems>
            </PageLayout>
            <DashboardFooter />
        </>
    );
}
