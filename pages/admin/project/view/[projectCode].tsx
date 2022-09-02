import {
    cv,
    PageHead,
    PageLayout,
    Button,
    useModal,
    TextField,
    Select,
    TextArea,
    Text,
    Flex,
    Divider,
    useTopLoading,
} from 'opize-design-system';
import { DashboardItems } from '../../../../components/dashboard/items';
import styled from 'styled-components';

import { client } from '../../../../utils/opizeClient';
import { APIResponseError } from 'opize-client';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AdminHeader } from '../../../../components/page/admin/AdminHeader';
import { useForm } from 'react-hook-form';
import { CaretLeft, CaretRight } from 'phosphor-react';
import Link from 'next/link';
import { Back } from '../../../../components/share/back';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Title = styled.h1`
    font-size: 28px;
`;

type FormData = {
    code: string;
    name: string;
    url: string;
    iconUrl: string;
    bannerUrl: string;
    ruleUrl: string;
    status: string;
    userId: number;
    desc?: string;
};

export default function App() {
    const router = useRouter();
    const projectCode = router.query.projectCode as string;

    const { isLoading: userLoading, data: user } = useQuery(['user'], () => client.user.get({}), {});
    const { isLoading: projectLoading, data: project } = useQuery(['admin', 'project', projectCode], () =>
        client.project.get({
            projectCode,
        })
    );
    const { start, end } = useTopLoading();
    const modal = useModal();

    if (!userLoading && !user?.roles?.includes('admin')) {
        toast.warn('접근 권한이 없어요.');
        router.push('/dashboard');
    }

    return (
        <>
            <AdminHeader menu="project" />
            <PageLayout marginTop="32px" gap="20px">
                <PageLayout.Header>
                    <Link href={'/admin/project'} passHref>
                        <Back>돌아가기</Back>
                    </Link>
                </PageLayout.Header>
                <PageLayout.Content>{projectLoading || JSON.stringify(project)}</PageLayout.Content>
                <PageLayout.Pane></PageLayout.Pane>
            </PageLayout>
        </>
    );
}
