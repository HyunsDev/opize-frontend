import {
    PageHead,
    PageLayout,
    Button,
    Input,
    TextArea,
    Text,
    Flex,
    useTopLoading,
    ActionList,
    Box,
    Select,
} from 'opize-design-system';
import { DashboardItem } from '../../../../../components/page/dashboard/items';

import { client } from '../../../../../utils/opizeClient';
import { APIResponseError, ProjectObject } from 'opize-client';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { AdminProjectHeader } from '../../../../../components/page/admin/project/adminProjectHeader';
import { useEffect, useState } from 'react';
import { AdminFooter } from '../../../../../components/page/admin/adminFooter';
import Link from 'next/link';

type ProjectInfoFormData = {
    name: string;
    desc: string;
    iconUrl: string;
    bannerUrl: string;
    status: string;
};
interface ProjectInfoProps {
    project?: ProjectObject;
    refetch: () => void;
}
function ProjectInfo({ project, refetch }: ProjectInfoProps) {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm<ProjectInfoFormData>();

    useEffect(() => {
        if (project) {
            setValue('name', project.name);
            setValue('desc', project.desc);
            setValue('iconUrl', project.iconUrl);
            setValue('bannerUrl', project.bannerUrl);
            setValue('status', project.status);
        }
    }, [project, setValue]);

    const submit = async (data: ProjectInfoFormData) => {
        try {
            if (!project) return;
            setIsLoading(true);
            console.log({
                projectCode: project?.code,
                ...data,
            });
            await client.project.patch({
                projectCode: project?.code,
                ...data,
            });
            refetch();
            toast.info('프로젝트 정보를 수정했어요.');
            setIsLoading(false);
        } catch (error: unknown) {
            console.error(error);
            setIsLoading(false);
            if (error instanceof APIResponseError) {
                toast.warn(`🤖 ${error.message || '문제가 발생했어요.'}`);
            } else {
                toast.error('서버에 연결할 수 없어요.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <Box
                title="기본 정보"
                footer={
                    <>
                        <Text></Text>
                        <Button width="60px" type="submit" primary isLoading={isLoading}>
                            적용
                        </Button>
                    </>
                }
            >
                <Flex gap={'20px'}>
                    {project && (
                        <Flex style={{ width: '320px' }}>
                            <DashboardItem
                                backgroundImage={project.bannerUrl}
                                icon={project.iconUrl}
                                subTitle={project.desc}
                                tags={[]}
                                title={project.name}
                                href={project.url}
                            />
                        </Flex>
                    )}

                    <Flex.Column gap="8px" style={{ flex: '1' }}>
                        <Input
                            label="프로젝트 이름 (name)"
                            {...register('name', {
                                required: '프로젝트 이름은 필수에요.',
                            })}
                            required
                        />
                        <TextArea
                            label="프로젝트 소개 (description)"
                            {...register('desc', {
                                required: '프로젝트 소개은 필수에요.',
                            })}
                            required
                        />
                        <Input
                            label="아이콘 URL (iconUrl)"
                            {...register('iconUrl', {
                                required: '아이콘은 필수에요.',
                            })}
                            required
                        />
                        <Input
                            label="배너 URL (bannerUrl)"
                            {...register('bannerUrl', {
                                required: '배너는 필수에요.',
                            })}
                            required
                        />
                        <Select {...register('status')} label="공개 상태 (status)">
                            <Select.Option value={'SHOW'}>SHOW</Select.Option>
                            <Select.Option value={'HIDDEN'}>HIDDEN</Select.Option>
                        </Select>
                    </Flex.Column>
                </Flex>
            </Box>
        </form>
    );
}

type ProjectRolesFormData = {
    ruleUrl: string;
};
interface ProjectRolesProps {
    project?: ProjectObject;
    refetch: () => void;
}
function ProjectRoles({ project, refetch }: ProjectRolesProps) {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm<ProjectRolesFormData>();

    useEffect(() => {
        if (project) {
            setValue('ruleUrl', project.ruleUrl);
        }
    }, [project, setValue]);

    const submit = async (data: ProjectRolesFormData) => {
        try {
            if (!project) return;
            setIsLoading(true);
            await client.project.patch({
                projectCode: project?.code,
                ...data,
            });
            refetch();
            toast.info('프로젝트 정보를 수정했어요.');
            setIsLoading(false);
        } catch (error: unknown) {
            console.error(error);
            setIsLoading(false);
            if (error instanceof APIResponseError) {
                toast.warn(`🤖 ${error.message || '문제가 발생했어요.'}`);
            } else {
                toast.error('서버에 연결할 수 없어요.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <Box
                title="프로젝트 이용약관"
                footer={
                    <>
                        <Text></Text>
                        <Button width="60px" type="submit" primary isLoading={isLoading}>
                            적용
                        </Button>
                    </>
                }
            >
                <Input
                    {...register('ruleUrl', {
                        required: '이용약관은 필수에요.',
                    })}
                    required
                />
            </Box>
        </form>
    );
}

export default function App() {
    const router = useRouter();
    const projectCode = router.query.projectCode as string;
    const { start, end } = useTopLoading();

    const { isLoading: userLoading, data: user } = useQuery(['user'], () => client.user.get({ userId: 'me' }), {});
    const {
        isLoading: projectLoading,
        data: project,
        refetch: projectRefetch,
    } = useQuery(['admin', 'project', projectCode], () =>
        client.project.get({
            projectCode,
            admin: true,
        })
    );

    if (!userLoading && !user?.roles?.includes('admin')) {
        toast.warn('접근 권한이 없어요.');
        router.push('/dashboard');
    }

    return (
        <>
            <AdminProjectHeader projectCode={projectCode} menu="setting" />
            <PageHead title={'Project Setting'}></PageHead>
            <PageLayout panPosition="start" marginTop="20px" gap="20px">
                <PageLayout.Pane>
                    <ActionList isSticky>
                        <Link
                            passHref
                            href={`/admin/project/[projectCode]/setting`}
                            as={`/admin/project/${router.query.projectCode}/setting`}
                        >
                            <ActionList.Item selected>프로젝트 정보</ActionList.Item>
                        </Link>

                        <Link
                            passHref
                            href={`/admin/project/[projectCode]/setting/oauth`}
                            as={`/admin/project/${router.query.projectCode}/setting/oauth`}
                        >
                            <ActionList.Item>OAuth</ActionList.Item>
                        </Link>
                    </ActionList>
                </PageLayout.Pane>
                <PageLayout.Content>
                    <Flex.Column gap="20px">
                        <Text size="24px">프로젝트 정보</Text>
                        <ProjectInfo project={project} refetch={projectRefetch} />
                        <ProjectRoles project={project} refetch={projectRefetch} />
                    </Flex.Column>
                </PageLayout.Content>
            </PageLayout>
            <AdminFooter />
        </>
    );
}
