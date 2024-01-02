import { Flex, cv, useTopLoading, A, Divider, CenterLayout, Span, Text } from 'opize-design-system';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { opizeApi } from '../../apis';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLoginButton } from '../../components/page/auth/googleLoginButton';
import OpizeLogo from '../../assets/opize_circle.png';

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 8px;
    border: solid 1px ${cv.border};
    width: 420px;
`;

const BoxHeader = styled.div`
    padding: 16px 32px;
    border-bottom: solid 1px ${cv.border};
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const BoxContent = styled.div`
    padding: 32px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

const Titles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const H1 = styled.h1`
    font-size: 20px;
    margin-top: 8px;
`;

export default function Login() {
    const router = useRouter();
    const redirectUrl = router.query.redirectUrl as string;
    const { start: loadingStart, finish: loadingEnd } = useTopLoading();

    const googleLogin = useGoogleLogin({
        onSuccess: async (data) => {
            try {
                loadingStart();
                const res = await opizeApi.auth.googleLogin({
                    token: data.access_token,
                });
                loadingEnd();
                localStorage.setItem('opizeToken', res.data.token);
                window.location.href = (redirectUrl && redirectUrl.startsWith('/') && redirectUrl) || '/dashboard';
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

            <CenterLayout minHeight="100vh" width="420px">
                <Box>
                    <BoxHeader>
                        <Image src={OpizeLogo} height={24} width={24} alt="Opize 로고" />
                        <Text size="16px">
                            <Span weight="semibold">Opize</Span> 회원가입
                        </Text>
                    </BoxHeader>
                    <BoxContent>
                        <Titles>
                            <H1>Opize에 회원가입합니다.</H1>
                            <Text>회원가입 수단을 선택하세요.</Text>
                        </Titles>

                        <Flex.Column gap="8px;">
                            <GoogleLoginButton onClick={() => googleLogin()}>Google으로 계속하기</GoogleLoginButton>
                            {/* <KakaoLoginButton onClick={() => null}>카카오 로그인</KakaoLoginButton> */}
                            <Divider margin="16px" style={{ borderColor: cv.border }} />
                            <Link href={'/auth/login'}>
                                <A>로그인</A>
                            </Link>
                        </Flex.Column>
                    </BoxContent>
                </Box>
            </CenterLayout>
        </>
    );
}
