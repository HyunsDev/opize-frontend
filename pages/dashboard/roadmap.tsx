import { BoxLayout, cv, H2, PageLayout, useColorTheme } from 'opize-design-system';
import { GetServerSideProps } from 'next';

import { client } from '../../utils/opizeClient';
import { useQuery } from 'react-query';
import { DashboardHeader } from '../../components/page/dashboard/header';
import { OpizeFooter } from '../../components/share/footer';
import styled from 'styled-components';

import { NotionRenderer } from 'react-notion-x';

import 'react-notion-x/src/styles.css';

const NotionRendererDiv = styled.div`
    main {
        padding: 0px;
    }
`;

export default function App() {
    const { isLoading, data: user, refetch } = useQuery(['user', 'self'], () => client.user.get({ userId: 'me' }), {});
    const { isLoading: notionLoading, data: recordMap } = useQuery(
        ['dashboard', 'notion', 'page', '@roadmap'],
        () => client.dashboard.notion.page.get({ page: '@roadmap' }),
        {}
    );
    const { nowColorTheme } = useColorTheme();

    return (
        <>
            <DashboardHeader now="roadMap" />
            <BoxLayout backgroundColor={cv.background} minHeight="calc(100vh - 129px - 334px)">
                <NotionRendererDiv>
                    {!notionLoading && recordMap && (
                        <NotionRenderer recordMap={recordMap.recordMap} darkMode={nowColorTheme === 'dark'} />
                    )}
                </NotionRendererDiv>
            </BoxLayout>
            <OpizeFooter />
        </>
    );
}
