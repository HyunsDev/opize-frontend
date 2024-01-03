import {
    cv,
    PageHead,
    PageLayout,
    Button,
    useModal,
    Input,
    Select,
    TextArea,
    Text,
    Flex,
    Divider,
    useTopLoading,
    useCodeModal,
    Badge,
    Span,
} from 'opize-design-system';
import { DashboardItem, DashboardItems } from '../../../../components/page/dashboard/items';
import styled from 'styled-components';

import { client } from '../../../../utils/opizeClient';
import { APIResponseError, ProjectObject } from 'opize-client';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AdminHeader } from '../../../../components/page/admin/AdminHeader';
import { useForm } from 'react-hook-form';
import { CaretLeft, CaretRight, Code } from 'phosphor-react';
import Link from 'next/link';
import { Back } from '../../../../components/share/back';
import { AdminProjectHeader } from '../../../../components/page/admin/project/adminProjectHeader';
import { useEffect } from 'react';
import { AdminFooter } from '../../../../components/page/admin/adminFooter';

const ProjectDiv = styled.div`
    width: 30%;
    min-width: 350px;
    min-height: 320px;
`;

const ProjectInfos = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    background-color: ${cv.background};
    box-shadow: 0px 8px 16px rgba(26, 30, 33, 0.06);
    border: solid 1px ${cv.border};
    border-radius: 4px;
    gap: 16px;
    text-decoration: none;
    transition: 200ms;
    flex: 1;
    padding: 16px 20px;
    font-weight: 500;
    color: ${cv.gray500};
`;

const StyledProjectInfo = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 20px;
    font-size: 14px;
`;
interface ProjectInfoProps {
    label: string;
    children?: React.ReactNode;
}
function ProjectInfo({ label, children }: ProjectInfoProps) {
    return (
        <StyledProjectInfo>
            <Text size="12px" color={cv.gray500} weight="semibold">
                {label}
            </Text>
            {children}
        </StyledProjectInfo>
    );
}
const LowInfoButton = styled.div`
    position: absolute;
    top: 16px;
    right: 16px;
`;

interface ProjectOverviewProps {
    project?: ProjectObject;
}
function ProjectOverview({ project }: ProjectOverviewProps) {
    const codeModal = useCodeModal();

    return (
        <PageLayout backgroundColor={cv.background2}>
            <PageLayout.Content style={{ padding: '32px 0px' }}>
                <Flex.Between>
                    <Text size={'20px'} weight={'semibold'}>
                        Overview
                    </Text>
                </Flex.Between>
                <Text>프로젝트의 상세 정보입니다.</Text>

                <Flex style={{ marginTop: '20px', gap: '16px' }}>
                    {project && (
                        <>
                            <ProjectDiv>
                                <DashboardItem
                                    backgroundImage={project.bannerUrl}
                                    icon={project.iconUrl}
                                    subTitle={project.desc}
                                    tags={[]}
                                    title={project.name}
                                    href={project.url}
                                    footer={{
                                        left: (
                                            <Text size="12px" color={cv.gray500}>
                                                by{' '}
                                                <Span color={cv.gray500} weight="semibold">
                                                    Opize
                                                </Span>
                                            </Text>
                                        ),
                                        right: (
                                            <Text size="12px" color={cv.gray500}>
                                                {project.url?.replace('https://', '')}
                                            </Text>
                                        ),
                                    }}
                                />
                            </ProjectDiv>
                            <ProjectInfos>
                                <Flex.Row gap="48px">
                                    <ProjectInfo label="ProjectCode">{project.code}</ProjectInfo>
                                    <ProjectInfo label="Project Id">{project.id}</ProjectInfo>
                                </Flex.Row>
                                <Flex.Row gap="48px">
                                    <ProjectInfo label="NAME">{project.name}</ProjectInfo>
                                    <ProjectInfo label="STATUS">
                                        <Badge color={project.status === 'SHOW' ? 'green' : 'gray'}>
                                            {project.status}
                                        </Badge>
                                    </ProjectInfo>
                                </Flex.Row>
                                <ProjectInfo label="DESCRIPTION">{project.desc}</ProjectInfo>

                                <LowInfoButton>
                                    <Button
                                        variant="tertiary"
                                        onClick={() =>
                                            codeModal.open(project, {
                                                title: project?.code,
                                            })
                                        }
                                    >
                                        RAW info
                                    </Button>
                                </LowInfoButton>
                            </ProjectInfos>
                        </>
                    )}
                </Flex>
            </PageLayout.Content>
        </PageLayout>
    );
}

interface ProjectLogs {}
function ProjectLogs() {
    return <PageLayout></PageLayout>;
}

export default function App() {
    const router = useRouter();
    const projectCode = router.query.projectCode as string;
    const { start, finish } = useTopLoading();
    const codeModal = useCodeModal();

    const { isLoading: userLoading, data: user } = useQuery(['user'], () => client.user.get({ userId: 'me' }), {});
    const { isLoading: projectLoading, data: project } = useQuery(
        ['admin', 'project', projectCode],
        () =>
            client.project.get({
                projectCode,
            }),
        {
            onSuccess: finish,
        }
    );

    useEffect(() => {
        start();
    }, [start]);

    if (!userLoading && !user?.roles?.includes('admin')) {
        toast.warn('접근 권한이 없어요.');
        router.push('/dashboard');
    }

    return (
        <>
            <AdminProjectHeader projectCode={projectCode} menu="overview" />
            <PageHead title={project?.code}>
                <Button as="a" href={project?.url} primary size="medium">
                    Visit
                </Button>
            </PageHead>
            <ProjectOverview project={project} />
            <AdminFooter />
        </>
    );
}
