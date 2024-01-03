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
    Input,
    Checkbox,
    H3,
    H2,
    H1,
    Modal,
    BoxLayout,
} from 'opize-design-system';
import { DashboardItem, DashboardItems } from '../../../components/page/dashboard/items';

import { client } from '../../../utils/opizeClient';
import { useQueries, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AdminHeader } from '../../../components/page/admin/AdminHeader';
import Link from 'next/link';
import { ArrowClockwise, Code, PencilSimple, X } from 'phosphor-react';
import { AdminFooter } from '../../../components/page/admin/adminFooter';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { APIResponseError } from 'opize-client';
import { getDashboardNotionPagesResponse } from 'opize-client/dist/apis/endpoints/dashboard/notion/page';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
dayjs.locale('ko');
dayjs.extend(relativeTime);

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
                    <Input
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

function PageRow({ page }: { page: any }) {
    const modal = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const { refetch } = useQuery<getDashboardNotionPagesResponse['recordMaps']>(
        ['admin', 'notion', 'pages'],
        async () => (await client.dashboard.notion.page.list({})).recordMaps,
        {}
    );

    const editCache = (page: string, code: string) => {
        modal.open(<UpdateCacheModal refetch={refetch} page={page} code={code} />);
    };

    const removeCache = (page: string) => {
        modal.open(
            <Modal>
                <Modal.Header>캐시를 삭제하시겠어요?</Modal.Header>
                <Modal.Footer>
                    <Button>취소</Button>
                    <Button
                        onClick={async () => {
                            await client.dashboard.notion.page.delete({ page });
                            refetch();
                        }}
                        color="red"
                        variant="primary"
                    >
                        삭제
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const updateCache = async (pageId: string) => {
        setIsLoading(true);
        await client.dashboard.notion.page.patch({ page: pageId, reCaching: true });
        refetch();
        setIsLoading(false);
    };

    return (
        <ItemsTable.Row key={page.id}>
            <ItemsTable.Row.Text text={page.pageId} subText={dayjs().to(page.cachedAt)} />
            <ItemsTable.Row.Text text={page.code || ''} />
            <ItemsTable.Row.Component flex={1} width="100px">
                <Button onClick={() => updateCache(page.pageId)} isLoading={isLoading} variant={'tertiary'} iconOnly>
                    <ArrowClockwise />
                </Button>
                <Button onClick={() => editCache(page.pageId, page.code)} variant={'tertiary'} iconOnly>
                    <PencilSimple />
                </Button>
                <Button onClick={() => removeCache(page.pageId)} variant={'tertiary'} color="red" iconOnly>
                    <X />
                </Button>
            </ItemsTable.Row.Component>
        </ItemsTable.Row>
    );
}

function CreateCacheModal({ refetch }: { refetch: () => void }) {
    const [page, setPage] = useState('');
    const [pageCode, setPageCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const modal = useModal();

    const create = async (page: string, pageCode: string) => {
        setIsLoading(true);
        try {
            await client.dashboard.notion.page.get({ page: page });
            toast.info('페이지가 성공적으로 캐싱되었어요.');
            if (pageCode) {
                await client.dashboard.notion.page.patch({
                    page: page,
                    pageCode: pageCode,
                });
                toast.info('페이지 코드가 추가되었어요.');
            }

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
                <Input label="아이디" value={page} onChange={(e) => onChange(e.target.value)} />
                <Input label="페이지 코드" value={pageCode} onChange={(e) => setPageCode(e.target.value)} />
                <Button onClick={() => create(page, pageCode)} isLoading={isLoading}>
                    생성
                </Button>
            </Flex.Column>
        </Flex.Column>
    );
}

export default function App() {
    const modal = useModal();
    const { isLoading: userLoading, data: user } = useQuery(['user'], () => client.user.get({ userId: 'me' }), {});
    const {
        isLoading: notionsIsLoading,
        data: pages,
        refetch,
    } = useQuery<getDashboardNotionPagesResponse['recordMaps']>(
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

    return (
        <>
            <AdminHeader menu="notion" />
            <PageHead title="Notion">
                <Button size="medium" primary onClick={newCache}>
                    새로운 캐시
                </Button>
            </PageHead>
            <BoxLayout>
                <ItemsTable>
                    {pages?.map((page) => (
                        <PageRow page={page} key={page.id} />
                    ))}
                </ItemsTable>
            </BoxLayout>
            <AdminFooter />
        </>
    );
}
