import { Flex, H1, PageLayout, TextField, Button, cv, Link as LinkA, Header, useTopLoading } from 'opize-design-system';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { opizeApi } from '../../apis';
import { toast } from 'react-toastify';
import { LoginPageLayout } from '../../components/loginPageLayout';
import { useRouter } from 'next/router';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

const StyledGoogleLoginButton = styled.button`
    width: 100%;
    height: 44px;
    background-color: ${cv.bg_element1};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    border: solid 1px ${cv.border4};
    gap: 8px;
    transition: 200ms;

    &:hover {
        background-color: ${cv.bg_element2};
    }
`;

function GoogleLoginButton(props: { onClick: () => void }) {
    return (
        <StyledGoogleLoginButton onClick={props.onClick}>
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path
                        fill="#4285F4"
                        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                    />
                    <path
                        fill="#34A853"
                        d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                    />
                    <path
                        fill="#EA4335"
                        d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                    />
                </g>
            </svg>
            Google로 계속하기
        </StyledGoogleLoginButton>
    );
}

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
                <title>로그인 | Opize</title>
            </Head>
            <LoginPageLayout title="Log in" subTitle="Opize에 로그인합니다.">
                <Flex.Column gap="8px;" style={{ marginTop: '24px' }}>
                    <GoogleLoginButton onClick={() => googleLogin()} />
                </Flex.Column>
                추후 디자인 수정 예정
            </LoginPageLayout>
        </>
    );
}
