import { cv, H2, PageLayout, useColorTheme } from 'opize-design-system';
import { GetServerSideProps } from 'next';

import { client } from '../../utils/opizeClient';
import { useQuery } from 'react-query';
import { DashboardHeader } from '../../components/page/dashboard/header';
import { DashboardFooter } from '../../components/page/dashboard/footer';
import styled from 'styled-components';

import { NotionAPI } from 'notion-client';
import { NotionRenderer } from 'react-notion-x';

import 'react-notion-x/src/styles.css';

const NotionRendererDiv = styled.div`
    main {
        padding: 0px;
        width: 100%;
    }
`;

export default function App({ recordMap }: { recordMap: any }) {
    const { isLoading, data: user, refetch } = useQuery(['user', 'self'], () => client.user.get({ userId: 'me' }), {});
    const { nowColorTheme } = useColorTheme();

    return (
        <>
            <DashboardHeader now="roadMap" />
            <PageLayout backgroundColor={cv.bg_page2}>
                <NotionRendererDiv>
                    <H2>로드맵</H2>
                    <NotionRenderer recordMap={recordMap} darkMode={nowColorTheme === 'dark'} />
                </NotionRendererDiv>
            </PageLayout>
            <DashboardFooter />
        </>
    );
}

// TODO: Notion Record Map 불러오는 방식 최적화
export const getServerSideProps: GetServerSideProps = async (context) => {
    let recordMap: any;
    const notion = new NotionAPI();
    recordMap = await notion.getPage(process.env.NEXT_PUBLIC_NOTION_ROADMAP_PAGE_ID as string);

    return {
        props: { recordMap },
    };
};
