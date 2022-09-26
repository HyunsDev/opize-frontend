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
import { DashboardItems } from '../../../components/dashboard/items';
import styled from 'styled-components';

import { client } from '../../../utils/opizeClient';
import { APIResponseError } from 'opize-client';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AdminHeader } from '../../../components/page/admin/AdminHeader';
import { useForm } from 'react-hook-form';
import { CaretLeft, CaretRight } from 'phosphor-react';
import Link from 'next/link';
import { Back } from '../../../components/share/back';
import { AdminFooter } from '../../../components/page/admin/adminFooter';

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
    const { isLoading, data: user, refetch } = useQuery(['user'], () => client.user.get({ userId: 'me' }), {});
    const router = useRouter();
    const { start, end } = useTopLoading();
    const modal = useModal();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        mode: 'onChange',
    });

    if (!isLoading && !user?.roles?.includes('admin')) {
        toast.warn('접근 권한이 없어요.');
        router.push('/dashboard');
    }

    const submit = async (data: FormData) => {
        try {
            start();
            await client.project.post(data);
            toast.info(`${data.code} 프로젝트를 생성했어요.`);
            router.push('/admin/project');
            end();
        } catch (err: unknown) {
            console.error(err);
            end();
            if (err instanceof APIResponseError) {
                toast.warn(`🤖 ${err.message || '문제가 발생했어요.'}`);
            } else {
                toast.error('서버에 연결할 수 없어요.');
            }
        }
    };

    return (
        <>
            <AdminHeader menu="project" />

            <StyledForm onSubmit={handleSubmit(submit)}>
                <PageLayout width="900px" marginTop="32px" gap="20px">
                    <PageLayout.Header>
                        <Link href={'/admin/project'} passHref>
                            <Back>돌아가기</Back>
                        </Link>

                        <Title>프로젝트 생성</Title>
                        <Text color={cv.text3}>새로운 프로젝트를 생성합니다.</Text>
                    </PageLayout.Header>
                    <PageLayout.Content>
                        <Flex.Column gap="20px">
                            <TextField
                                {...register('code', {
                                    required: 'code를 입력해주세요.',
                                    validate: (value) =>
                                        /[^a-z_1-9]/.test(value)
                                            ? '영어 소문자와 "_", 숫자 만 사용할 수 있어요.'
                                            : true,
                                })}
                                required
                                label="프로젝트 코드 (code)"
                                placeholder='영어 소문자와 "_" 만 사용할 수 있어요.'
                                error={errors.code?.message}
                            />
                            <TextField
                                {...register('name', {
                                    required: 'name를 입력해주세요.',
                                })}
                                required
                                label="프로젝트 이름 (name)"
                                error={errors.name?.message}
                            />
                            <TextField
                                {...register('url', {
                                    required: 'url를 입력해주세요.',
                                })}
                                required
                                label="프로젝트 링크 (url)"
                                error={errors.url?.message}
                                leftAddon="https://"
                            />
                            <TextField
                                {...register('iconUrl', {
                                    required: 'iconUrl를 입력해주세요.',
                                })}
                                required
                                label="프로젝트 아이콘 (iconUrl)"
                                error={errors.iconUrl?.message}
                            />
                            <TextField
                                {...register('bannerUrl', {
                                    required: 'bannerUrl를 입력해주세요.',
                                })}
                                required
                                label="프로젝트 배너 bannerUrl)"
                                error={errors.bannerUrl?.message}
                            />
                            <TextField
                                {...register('ruleUrl', {
                                    required: '이용약관의 주소를 입력해주세요.',
                                })}
                                required
                                label="이용약관 (ruleUrl)"
                                error={errors.ruleUrl?.message}
                            />
                            <Select {...register('status')} label="프로젝트 공개 상태 (status)">
                                <Select.Option value={'SHOW'}>SHOW</Select.Option>
                                <Select.Option value={'HIDDEN'}>HIDDEN</Select.Option>
                            </Select>
                            <TextField
                                {...register('userId', {
                                    required: 'userId를 입력해주세요.',
                                })}
                                required
                                label="프로젝트 리더 User 아이디 (userId)"
                                error={errors.userId?.message}
                            />
                            <TextArea
                                {...register('desc', {
                                    required: 'desc를 입력해주세요.',
                                })}
                                required
                                label="프로젝트 소개 (desc)"
                                error={errors.desc?.message}
                            />
                        </Flex.Column>
                    </PageLayout.Content>
                    <PageLayout.Pane>
                        <Button type="submit" width="100%" variant="contained" disabled={!isValid}>
                            프로젝트 생성
                        </Button>
                    </PageLayout.Pane>
                </PageLayout>
            </StyledForm>
            <AdminFooter />
        </>
    );
}
