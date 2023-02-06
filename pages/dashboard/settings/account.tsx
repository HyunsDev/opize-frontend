/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
    ActionList,
    Box,
    Button,
    cv,
    Flex,
    H2,
    PageHead,
    PageLayout,
    Switch,
    Text,
    TextField,
    Link as A,
    useDialog,
} from 'opize-design-system';
import { DashboardHeader } from '../../../components/page/dashboard/header';
import { OpizeFooter } from '../../../components/share/footer';
import { SettingSidebar } from '../../../components/page/dashboard/settings/sidebar';
import { useQuery } from 'react-query';
import { client } from '../../../utils/opizeClient';
import { APIResponseError, UserObject } from 'opize-client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { sleep } from '../../../utils/sleep';
import styled from 'styled-components';

type MarketingBoxForm = {
    marketingAccept: boolean;
};
function MarketingBox({ user, refetch }: { user?: UserObject; refetch: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm<MarketingBoxForm>({
        mode: 'onChange',
    });

    useEffect(() => {
        if (user) setValue('marketingAccept', !!user.marketingAccept);
    }, [setValue, user]);

    const submit = async (data: MarketingBoxForm) => {
        try {
            if (!user) return;
            setIsLoading(true);
            await client.user.patch({
                userId: 'me',
                marketingAccept: data.marketingAccept ? new Date() : null,
            });
            refetch();
            if (data.marketingAccept) {
                toast.info('마케팅 수신에 동의했어요.');
            } else {
                toast.info('마케틴 수신 동의를 철회했어요.');
            }
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
                title="마케팅 수신 동의"
                footer={
                    <>
                        <Text>가끔씩 이메일로 흥미롭고 유용한 소식을 보내드릴게요</Text>
                        <Button width="60px" type="submit" variant="contained" isLoading={isLoading}>
                            적용
                        </Button>
                    </>
                }
            >
                <Text>Opize의 개발자가 보내는 유용한 소식들을 받아보세요. 언제든 취소할 수 있어요.</Text>
                <Switch {...register('marketingAccept')} />
            </Box>
        </form>
    );
}

function DeleteAccount() {
    const dialog = useDialog();

    const deleteAccount = async () => {
        try {
            const res = await client.user.delete({
                userId: 'me',
            });
            console.log(res);
            localStorage.removeItem('opizeToken');
            toast.info('계정이 삭제되었어요.');
            location.href = '/';
        } catch (err) {
            console.error(err);
        }
    };

    const openDialog = () => {
        dialog({
            title: '정말로 계정을 삭제하시겠어요?',
            content: '삭제한 계정은 되돌릴 수 없으며, Opize와 연결된 다른 서비스에서 중대한 오류가 발생할 수 있어요!',
            buttons: [
                {
                    children: '취소',
                    onClick: () => {},
                },
                {
                    children: '삭제',
                    onClick: () => deleteAccount(),
                    color: 'red',
                    variant: 'contained',
                },
            ],
        });
    };

    return (
        <Box
            title="계정 삭제"
            footer={
                <>
                    <A>자세히 알아보기</A>
                    <Button variant="contained" color="red" onClick={openDialog}>
                        계정 삭제
                    </Button>
                </>
            }
        >
            <Text>
                계정을 삭제한 경우 이용중인 Opize 프로젝트에서 중대한 오류가 발생할 수 있으니, 계정을 삭제하기 이전에 각
                프로젝트에서 계정을 삭제해주세요.
            </Text>
        </Box>
    );
}

export default function App() {
    const { data: user, refetch: refetchUser } = useQuery(['user'], () => client.user.get({ userId: 'me' }), {});

    return (
        <>
            <Head>
                <title>계정 | 설정</title>
            </Head>
            <DashboardHeader now="settings" />
            <PageHead title="설정"></PageHead>
            <PageLayout panPosition="start" marginTop="20px" gap="20px">
                <PageLayout.Pane>
                    <SettingSidebar now="account" />
                </PageLayout.Pane>
                <PageLayout.Content>
                    <Flex.Column gap="16px">
                        <H2>계정</H2>
                        <MarketingBox user={user} refetch={refetchUser} />

                        <DeleteAccount />
                    </Flex.Column>
                </PageLayout.Content>
            </PageLayout>
            <OpizeFooter />
        </>
    );
}
