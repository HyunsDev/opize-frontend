import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ActionList, Box, Button, PageHead, PageLayout, Text, TextField } from 'opize-design-system';
import { DashboardHeader } from '../../../components/page/dashboard/header';
import { DashboardFooter } from '../../../components/page/dashboard/footer';
import { SettingSidebar } from '../../../components/page/dashboard/settings/sidebar';
import { useQuery } from 'react-query';
import { client } from '../../../utils/opizeClient';
import { APIResponseError, UserObject } from 'opize-client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { sleep } from '../../../utils/sleep';

type NameBoxForm = {
    name: string;
};
function NameBox({ user, refetch }: { user?: UserObject; refetch: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm<NameBoxForm>({
        mode: 'onChange',
    });

    useEffect(() => {
        if (user) setValue('name', user.name);
    }, [setValue, user]);

    const submit = async (data: NameBoxForm) => {
        try {
            if (!user) return;
            setIsLoading(true);
            await client.user.patch({
                userId: 'me',
                name: data.name,
            });
            toast.info('이름을 변경했어요.');
            refetch();
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
                title="이름"
                footer={
                    <>
                        <Text>최대 50자까지 정할 수 있어요</Text>
                        <Button width="60px" type="submit" variant="contained" isLoading={isLoading}>
                            적용
                        </Button>
                    </>
                }
            >
                <Text>Opize와 Opize 프로젝트에서 표시되는 이름입니다</Text>
                <TextField
                    {...register('name', {
                        required: '이름을 입력해주세요.',
                        maxLength: 50,
                    })}
                    error={errors.name?.message}
                    width="300px"
                    required
                />
            </Box>
        </form>
    );
}

export default function App() {
    const { data: user, refetch: refetchUser } = useQuery(['user'], () => client.user.get({ userId: 'me' }), {});

    return (
        <>
            <Head>
                <title>설정</title>
            </Head>
            <DashboardHeader now="settings" />
            <PageHead title="설정"></PageHead>
            <PageLayout panPosition="start" marginTop="20px" gap="20px">
                <PageLayout.Pane>
                    <SettingSidebar now="index" />
                </PageLayout.Pane>
                <PageLayout.Content>
                    <NameBox user={user} refetch={refetchUser} />
                </PageLayout.Content>
            </PageLayout>
            <DashboardFooter />
        </>
    );
}
