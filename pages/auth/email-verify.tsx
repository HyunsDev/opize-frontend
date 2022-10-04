import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Checkbox, cv, Flex, Header, TextField, useTopLoading, Link as LinkA } from 'opize-design-system';
import styled from 'styled-components';
import { LoginPageLayout } from '../../components/page/auth/loginPageLayout';

import LogoImg from '../../assets/opize 로고텍스트.png';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { opizeApi } from '../../apis';
import { AxiosError } from 'axios';
import { OpizeHTTPError } from '../../apis/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function EmailVerifyPage() {
    return (
        <>
            <Head>
                <title>이메일 인증 | Opize</title>
            </Head>

            <Header>
                <Header.Notice />
                <Header.Nav>
                    <Header.Nav.Left>
                        <Link href={'/'}>
                            <a>
                                <Image src={LogoImg} alt="" height={28} width={97} />
                            </a>
                        </Link>
                    </Header.Nav.Left>
                    <Header.Nav.Right style={{ fontWeight: '400' }}>
                        <Link href="/auth/login" passHref>
                            <Button as="a" variant="outlined">
                                로그인
                            </Button>
                        </Link>
                    </Header.Nav.Right>
                </Header.Nav>
            </Header>

            <LoginPageLayout title="이메일 인증을 완료해주세요." logo={LogoImg} titleLink="/">
                이메일로 인증 메일을 보냈어요.
            </LoginPageLayout>
        </>
    );
}
