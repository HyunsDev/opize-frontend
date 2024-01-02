/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { Flex, H2, ItemsTable, PageHead, PageLayout, Text, A } from 'opize-design-system';
import { DashboardHeader } from '../../../components/page/dashboard/header';
import { OpizeFooter } from '../../../components/share/footer';
import { SettingSidebar } from '../../../components/page/dashboard/settings/sidebar';
import { useQuery } from 'react-query';
import { client } from '../../../utils/opizeClient';

export default function App() {
    const { data: user, refetch: refetchUser } = useQuery(['user'], () => client.user.get({ userId: 'me' }), {});
    const { data: oauths, refetch: refetchOAuths } = useQuery(
        ['user', 'oauths'],
        () => client.user.oauth.list({ userId: 'me' }),
        {}
    );

    return (
        <>
            <Head>
                <title>프로젝트 | 설정</title>
            </Head>
            <DashboardHeader now="settings" />
            <PageHead title="설정"></PageHead>
            <PageLayout gap="20px">
                <PageLayout.Pane>
                    <SettingSidebar now="project" />
                </PageLayout.Pane>
                <PageLayout.Content>
                    <Flex.Column gap="16px">
                        <Flex.Column>
                            <H2>프로젝트</H2>
                            <Text>현재 이용중인 프로젝트입니다.</Text>
                        </Flex.Column>
                        <ItemsTable>
                            {oauths &&
                                oauths.oauths?.map((oauth) => (
                                    <ItemsTable.Row key={oauth.id}>
                                        <ItemsTable.Row.Avatar
                                            icon={oauth.project.iconUrl}
                                            name={<A to={oauth.project.url}>{oauth.project.name}</A>}
                                            label={oauth.project.desc}
                                        />
                                    </ItemsTable.Row>
                                ))}
                        </ItemsTable>
                    </Flex.Column>
                </PageLayout.Content>
            </PageLayout>
            <OpizeFooter />
        </>
    );
}
