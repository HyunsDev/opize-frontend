import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Checkbox, cv, Flex, Header, TextField, useTopLoading, Link as LinkA } from 'opize-design-system';
import styled from 'styled-components';
import { LoginPageLayout } from '../../components/loginPageLayout';

import LogoImg from '../../assets/opize 로고텍스트.png';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { opizeApi } from '../../apis';
import { AxiosError } from 'axios';
import { OpizeHTTPError } from '../../apis/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Title = styled.h1`
    margin-top: 12px;
    font-weight: 600;
    font-size: 26px;
`;

const StyledLink = styled.a`
    font-size: 14px;
    text-decoration: none;
    color: ${cv.text3};
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 24px;
`;

type FormData = {
    name: string;
    email: string;
    password: string;
    passwordRetry: string;
    privacy: boolean;
    marking: boolean;
};

export default function SignupPage() {
    const { start: loadingStart, end: loadingEnd } = useTopLoading();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        watch,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>();

    const submit = async (data: FormData) => {
        if (isLoading) return;
        setIsLoading(true);
        loadingStart();

        try {
            const res = await opizeApi.auth.signup(data);
            if (res.data.code === 'already_account_exist') {
                toast.info('이미 계정이 존재해요. 로그인 해주세요.');
                router.push('/auth/login');
            } else if (res.data.code === 'email_send') {
                router.push('/auth/');
            }
        } catch (err) {
            if (err instanceof OpizeHTTPError) {
                console.error(err);
                toast.error('문제가 발생했어요.');
            } else {
                throw err;
            }
        }

        loadingEnd();
        setIsLoading(false);
    };

    return (
        <>
            <Head>
                <title>회원가입 | Opize</title>
            </Head>

            <Header>
                <Header.Notice />
                <Header.Nav>
                    <Header.Nav.Left>
                        <Link href={'/app'}>
                            <a>
                                <Image src={LogoImg} alt="" height={28} width={97} />
                            </a>
                        </Link>
                    </Header.Nav.Left>
                    <Header.Nav.Right style={{ fontWeight: '400' }}>
                        <Link href="/auth/signup" passHref>
                            <Button as="a" variant="outlined">
                                회원가입
                            </Button>
                        </Link>
                    </Header.Nav.Right>
                </Header.Nav>
            </Header>

            <LoginPageLayout logo={LogoImg} title="Opize에 회원가입합니다." titleLink="/">
                <StyledForm onSubmit={handleSubmit(submit)}>
                    <TextField
                        {...register('name', {
                            required: '이름을 입력해주세요.',
                        })}
                        label="이름"
                        error={errors.name?.message}
                    />
                    <TextField
                        {...register('email', {
                            required: '이메일을 입력해주세요.',
                            pattern: {
                                value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i,
                                message: '이메일 형식이 맞지 않아요.',
                            },
                        })}
                        label="이메일"
                        type={'email'}
                        error={errors.email?.message}
                    />
                    <TextField
                        {...register('password', {
                            required: '비밀번호를 입력해주세요.',
                            minLength: {
                                value: 8,
                                message: '비밀번호는 8자 이상으로 입력해주세요.',
                            },
                        })}
                        label="비밀번호"
                        type="password"
                        error={errors.password?.message}
                    />
                    <TextField
                        {...register('passwordRetry', {
                            required: '비밀번호를 입력해주세요.',
                            validate: (value) => value === watch('password') || '비밀번호가 서로 달라요.',
                        })}
                        label="비밀번호 재입력"
                        type="password"
                        error={errors.passwordRetry?.message}
                    />
                    <Checkbox
                        {...register('privacy', {
                            required: true,
                        })}
                        text={
                            <>
                                [필수]{' '}
                                <LinkA as="a" href="https://beta.opize.me/privacy" target={'_blank'} rel="noreferrer">
                                    개인정보 수집 및 이용 동의
                                </LinkA>
                            </>
                        }
                    />
                    <Checkbox
                        {...register('marking', {
                            required: true,
                        })}
                        text={
                            <>
                                [선택] Opize의 뉴스레터와 새로운 기능 출시 안내를 받아보세요. 언제든 취소할 수 있어요.{' '}
                                <LinkA as="a" href="https://beta.opize.me/marting" target={'_blank'} rel="noreferrer">
                                    (광고, 마케팅 수신동의)
                                </LinkA>
                            </>
                        }
                    />
                    <Flex.Column gap="16px;" style={{ marginTop: '8px', alignItems: 'center' }}>
                        <Button type="submit" variant="contained" width="100%" size="large">
                            회원가입
                        </Button>
                        <Link href={'/auth/login'} passHref>
                            <StyledLink>로그인</StyledLink>
                        </Link>
                    </Flex.Column>
                </StyledForm>
            </LoginPageLayout>
        </>
    );
}
