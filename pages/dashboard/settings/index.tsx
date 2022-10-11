/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ActionList, Box, Button, cv, Flex, H2, PageHead, PageLayout, Text, TextField } from 'opize-design-system';
import { DashboardHeader } from '../../../components/page/dashboard/header';
import { DashboardFooter } from '../../../components/page/dashboard/footer';
import { SettingSidebar } from '../../../components/page/dashboard/settings/sidebar';
import { useQuery } from 'react-query';
import { client } from '../../../utils/opizeClient';
import { APIResponseError, UserObject } from 'opize-client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { sleep } from '../../../utils/sleep';
import styled from 'styled-components';

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
            refetch();
            toast.info('이름을 변경했어요.');
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

type ProfileImageBoxForm = {
    imageUrl: string;
};
const ProfileImg = styled.img`
    width: 96px;
    height: 96px;
    border-radius: 99999px;
    border: solid 1px ${cv.border3};
`;
function ProfileImageBox({ user, refetch }: { user?: UserObject; refetch: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        watch,
    } = useForm<ProfileImageBoxForm>({
        mode: 'onChange',
    });

    useEffect(() => {
        if (user) setValue('imageUrl', user.imageUrl);
    }, [setValue, user]);

    const submit = async (data: ProfileImageBoxForm) => {
        try {
            if (!user) return;
            setIsLoading(true);
            await client.user.patch({
                userId: 'me',
                imageUrl: data.imageUrl,
            });
            refetch();
            toast.info('프로필 사진을 변경했어요. 새로고침하면 모두 적용되요.');
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
                title="프로필 사진"
                footer={
                    <>
                        <Text>아직 URL 방식으로만 등록할 수 있어요.</Text>
                        <Button width="60px" type="submit" variant="contained" isLoading={isLoading}>
                            적용
                        </Button>
                    </>
                }
            >
                <Text>Opize와 Opize 프로젝트에서 표시되는 사진입니다.</Text>
                <Flex.Between>
                    <TextField
                        {...register('imageUrl', {
                            required: '프로필 이미지 URL을 입력해주세요.',
                        })}
                        error={errors.imageUrl?.message}
                        width="500px"
                        required
                    />
                    <ProfileImg src={watch('imageUrl')} alt="프로필 사진 미리보기" />
                </Flex.Between>
            </Box>
        </form>
    );
}

export default function App() {
    const { data: user, refetch: refetchUser } = useQuery(['user'], () => client.user.get({ userId: 'me' }), {});

    return (
        <>
            <Head>
                <title>프로필 | 설정</title>
            </Head>
            <DashboardHeader now="settings" />
            <PageHead title="설정"></PageHead>
            <PageLayout panPosition="start" marginTop="20px" gap="20px">
                <PageLayout.Pane>
                    <SettingSidebar now="index" />
                </PageLayout.Pane>
                <PageLayout.Content>
                    <Flex.Column gap="16px">
                        <H2>프로필</H2>
                        <NameBox user={user} refetch={refetchUser} />
                        <ProfileImageBox user={user} refetch={refetchUser} />
                    </Flex.Column>
                </PageLayout.Content>
            </PageLayout>
            <DashboardFooter />
        </>
    );
}
