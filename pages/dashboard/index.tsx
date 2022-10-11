import { Button, cv, Flex, H2, PageLayout, Span, Text } from 'opize-design-system';
import { DashboardItem, DashboardItems } from '../../components/page/dashboard/items';

import { client } from '../../utils/opizeClient';
import { useQuery } from 'react-query';
import { DashboardHeader } from '../../components/page/dashboard/header';
import { DashboardFooter } from '../../components/page/dashboard/footer';

import styled from 'styled-components';

const NextProjectDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    position: relative;
    gap: 18px;
`;

function NextProject() {
    return (
        <NextProjectDiv>
            <Text size="24px" weight="semibold">
                다음은 어떤 프로젝트를 진행할까요? 😎
            </Text>
            <Button variant="contained" as="a" href="https://discord.gg/RvzyaMr7Su" target="_blank">
                프로젝트 제안하기
            </Button>
        </NextProjectDiv>
    );
}

export default function App() {
    const { isLoading, data: user, refetch } = useQuery(['user', 'self'], () => client.user.get({ userId: 'me' }), {});
    const { data: projects } = useQuery(['dashboard', 'project'], () => client.project.list(), {});

    return (
        <>
            <DashboardHeader now="dashboard" />
            <PageLayout backgroundColor={cv.bg_page1}>
                <Flex.Column gap="20px" style={{ marginTop: '24px' }}>
                    <H2>Opize 프로젝트</H2>
                    <DashboardItems>
                        {projects &&
                            projects.projects.map((project) => (
                                <DashboardItem
                                    key={project.code}
                                    backgroundImage={project.bannerUrl}
                                    icon={project.iconUrl}
                                    title={project.name}
                                    subTitle={project.desc}
                                    href={project.url}
                                    tags={[]}
                                    footer={{
                                        left: (
                                            <Text size="12px" color={cv.text3}>
                                                by{' '}
                                                <Span color={cv.text2} weight="semibold">
                                                    Opize
                                                </Span>
                                            </Text>
                                        ),
                                        right: (
                                            <Text size="12px" color={cv.text3}>
                                                {project.url?.replace('https://', '')}
                                            </Text>
                                        ),
                                    }}
                                />
                            ))}
                    </DashboardItems>
                </Flex.Column>
            </PageLayout>
            <PageLayout padding="32px 0px" gap="0px">
                <NextProject />
            </PageLayout>
            <DashboardFooter />
        </>
    );
}
