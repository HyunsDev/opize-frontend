import {
    Flex,
    H1,
    PageLayout,
    TextField,
    Button,
    cv,
    Link as LinkA,
    Header,
    useTopLoading,
    H2,
    Link as A,
    Divider,
} from 'opize-design-system';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { opizeApi } from '../../apis';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { IndexHeader } from '../../components/page/index/header';
import { GoogleLoginButton } from '../../components/page/auth/googleLoginButton';
import { AuthPageLayout } from '../../components/page/auth/authPageLayout';

import opizeLogoTextImg from '../../assets/opize_IconText.png';
import { KakaoLoginButton } from '../../components/page/auth/kakaoLoginButton';

export default function Login() {
    const router = useRouter();
    const { start: loadingStart, end: loadingEnd } = useTopLoading();

    const googleLogin = useGoogleLogin({
        onSuccess: async (data) => {
            try {
                loadingStart();
                const res = await opizeApi.auth.googleLogin({
                    token: data.access_token,
                });
                loadingEnd();
                localStorage.setItem('opizeToken', res.data.token);
                router.push('/dashboard');
            } catch (err) {
                console.error(err);
                toast.error('서버에 문제가 발생했어요.');
            }
        },
    });

    return (
        <>
            <Head>
                <title>회원가입 | Opize</title>
            </Head>
            <IndexHeader />

            <AuthPageLayout>
                <H2>Opize에 회원가입합니다!</H2>
                <Flex.Column gap="8px;" style={{ marginTop: '32px' }}>
                    <GoogleLoginButton onClick={() => googleLogin()}>Google으로 계속하기</GoogleLoginButton>
                    {/* <KakaoLoginButton onClick={() => null}>카카오 로그인</KakaoLoginButton> */}
                </Flex.Column>
                <Divider margin="16px" style={{ borderColor: cv.border4 }} />
                <Link href={'/auth/login'}>
                    <A>로그인</A>
                </Link>
            </AuthPageLayout>
        </>
    );
}
