import {
    cv,
    PageHead,
    PageLayout,
    Button,
    useModal,
    useCodeModal,
    Text,
    Span,
    ItemsTable,
    Flex,
    TextField,
    Checkbox,
    H3,
    H2,
    H1,
    useDialog,
} from 'opize-design-system';
import { DashboardItem, DashboardItems } from '../../../components/page/dashboard/items';

import { client } from '../../../utils/opizeClient';
import { useQueries, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AdminHeader } from '../../../components/page/admin/AdminHeader';
import Link from 'next/link';
import { Code } from 'phosphor-react';
import { AdminFooter } from '../../../components/page/admin/adminFooter';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { APIResponseError } from 'opize-client';

type CreateCacheModalFormData = {
    pageCode: string;
    reCaching: boolean;
};
function UpdateCacheModal({ page, code, refetch }: { code: string; page: string; refetch: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const modal = useModal();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<CreateCacheModalFormData>({
        defaultValues: {
            pageCode: code || '',
        },
    });

    const submit = async (data: CreateCacheModalFormData) => {
        setIsLoading(true);
        try {
            const res = await client.dashboard.notion.page.patch({
                page: page,
                pageCode: data.pageCode,
                reCaching: data.reCaching,
            });
            refetch();
            modal.close();
        } catch (err) {
            console.error(err);
            if (err instanceof APIResponseError) {
                toast.error(`문제가 생겼어요. ${err.body.message}`);
            } else {
                toast.error(`서버에 연결할 수 없어요`);
            }
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <Flex.Column gap="8px">
                <H3>노션 캐시 업데이트</H3>
                <Text>{page}</Text>
                <Flex.Column gap="8px">
                    <TextField
                        label="pageCode"
                        {...register('pageCode', { required: '필수 항목입니다.' })}
                        error={errors.pageCode?.message}
                    />
                    <Checkbox label="reCaching" {...register('reCaching')} />
                    <Button type="submit" isLoading={isLoading}>
                        수정
                    </Button>
                </Flex.Column>
            </Flex.Column>
        </form>
    );
}

function CreateCacheModal({ refetch }: { refetch: () => void }) {
    const [page, setPage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const modal = useModal();

    const create = async (page: string) => {
        setIsLoading(true);
        try {
            const res = await client.dashboard.notion.page.get({ page: page });
            toast.info('페이지가 성공적으로 캐싱되었어요.');
            refetch();
            modal.close();
        } catch (err) {
            console.error(err);
            if (err instanceof APIResponseError) {
                toast.error(`문제가 생겼어요. ${err.body.message}`);
            } else {
                toast.error(`서버에 연결할 수 없어요`);
            }
        }
        setIsLoading(false);
    };

    const onChange = (value: string) => {
        value = value.replace('https://www.notion.so/hyunsdev/', '');
        setPage(value);
    };

    return (
        <Flex.Column gap="8px">
            <H3>노션 캐시 생성</H3>
            <Flex.Column gap="8px">
                <TextField label="아이디" value={page} onChange={(e) => onChange(e.target.value)} />
                <Button onClick={() => create(page)} isLoading={isLoading}>
                    생성
                </Button>
            </Flex.Column>
        </Flex.Column>
    );
}

export default function App() {
    const modal = useModal();
    const dialog = useDialog();
    const { isLoading: userLoading, data: user } = useQuery(['user'], () => client.user.get({ userId: 'me' }), {});
    const {
        isLoading: notionsIsLoading,
        data: pages,
        refetch,
    } = useQuery(
        ['admin', 'notion', 'pages'],
        async () => (await client.dashboard.notion.page.list({})).recordMaps,
        {}
    );

    const router = useRouter();
    if (!userLoading && !user?.roles?.includes('admin')) {
        toast.warn('접근 권한이 없어요.');
        router.push('/dashboard');
        return;
    }

    const newCache = () => {
        modal.open(<CreateCacheModal refetch={refetch} />);
    };

    const editCache = (page: string, code: string) => {
        modal.open(<UpdateCacheModal refetch={refetch} page={page} code={code} />);
    };

    const removeCache = (page: string) => {
        dialog({
            title: '캐시를 삭제하시겠어요?',
            buttons: [
                {
                    children: '취소',
                    onClick: () => null,
                },
                {
                    children: '삭제',
                    variant: 'contained',
                    color: 'red',
                    onClick: async () => {
                        await client.dashboard.notion.page.delete({ page });
                        refetch();
                    },
                },
            ],
        });
    };

    return (
        <>
            <AdminHeader menu="notion" />
            <PageHead title="Notion">
                <Button size="large" variant="contained" onClick={newCache}>
                    새로운 캐시
                </Button>
            </PageHead>
            <PageLayout>
                <ItemsTable>
                    {pages?.map((page) => (
                        <ItemsTable.Row key={page.id}>
                            <ItemsTable.Row.Text text={page.pageId} subText={page.cachedAt} />
                            <ItemsTable.Row.Text text={page.code || ''} />
                            <ItemsTable.Row.Buttons
                                buttons={[
                                    [
                                        {
                                            label: '수정',
                                            onClick: () => editCache(page.pageId, page.code),
                                        },
                                        {
                                            label: '삭제',
                                            color: 'red',
                                            onClick: () => removeCache(page.pageId),
                                        },
                                    ],
                                ]}
                            />
                        </ItemsTable.Row>
                    ))}
                </ItemsTable>
            </PageLayout>
            <AdminFooter />
        </>
    );
}
