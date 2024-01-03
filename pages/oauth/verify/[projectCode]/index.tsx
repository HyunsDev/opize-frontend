/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { APIResponseError, ProjectObject } from 'opize-client';
import { CenterLayout, cv, Flex, Span, Text } from 'opize-design-system';
import styled from 'styled-components';
import { client } from '../../../../utils/opizeClient';
import { josa } from 'josa';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useUser } from '../../../../hooks/useUser';
import OpizeLogo from '../../../../assets/opize_circle.png';
import { UserCircle } from '@phosphor-icons/react';

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
    padding: 32px 0px 32px 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

const Img = styled.img`
    width: 32px;
    height: 32px;
`;

const H1 = styled.h1`
    font-size: 20px;
    margin-top: 8px;
`;

const Titles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledUserBlock = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 32px;
    cursor: pointer;
    width: 100%;

    transition: 150ms;
    &:hover {
        background-color: ${cv.gray100};
    }
`;
const UserBlockNames = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
function UserBlock({
    email,
    image,
    name,
    onClick,
}: {
    image: string;
    name: string;
    email: string;
    onClick: () => void;
}) {
    return (
        <StyledUserBlock onClick={onClick}>
            <Flex.Row gap="8px">
                <Image src={image} width={32} height={32} alt="유저 프로필" />
                <UserBlockNames>
                    <Text size="14px" weight="semibold">
                        {name}
                    </Text>
                    <Text size="12px">{email}</Text>
                </UserBlockNames>
            </Flex.Row>
        </StyledUserBlock>
    );
}

function OtherUserBlock({ moveLink }: { moveLink: string }) {
    const move = () => {
        localStorage.removeItem('opizeToken');
        location.href = moveLink;
    };

    return (
        <StyledUserBlock onClick={move}>
            <Flex.Row gap="8px">
                <UserCircle size={32} color={cv.text} />
                <UserBlockNames>
                    <Text size="14px" weight="semibold">
                        다른 계정으로 로그인
                    </Text>
                    <Text size="12px">기존 계정은 로그아웃됩니다.</Text>
                </UserBlockNames>
            </Flex.Row>
        </StyledUserBlock>
    );
}

interface AppProps {
    projectCode: string;
    project?: ProjectObject;
    error?: {
        title: string;
        subtitle: string;
    };
}
export default function App({ projectCode, project, error }: AppProps) {
    const router = useRouter();
    const redirectUrl = router.query.redirectUrl;
    const { user } = useUser();

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState({
        title: `${josa(`${project?.name}#{으로}`)} 이동합니다`,
        subtitle: '잠시만 기다려주세요',
    });

    useEffect(() => {
        if (!redirectUrl) {
            setIsError(true);
            setMessage({
                title: '문제가 발생했어요',
                subtitle: '리다이렉트 주소가 없어요.',
            });
            return;
        }
    }, [project, redirectUrl]);

    const emailLogin = async () => {
        if (!project) return;

        try {
            const res = await client.oAuth.verify({
                projectCode: project.code,
                redirectUrl: redirectUrl as string,
            });
            window.location.href = `${redirectUrl}?token=${res.token}`;
        } catch (error) {
            setIsError(true);
            if (error instanceof APIResponseError) {
                setMessage({
                    title: '문제가 발생했어요',
                    subtitle: error.message,
                });
            } else {
                setMessage({
                    title: '문제가 발생했어요',
                    subtitle: '서버에 문제가 발생했어요.',
                });
            }
        }
    };

    if (error) {
        return (
            <CenterLayout minHeight="100vh">
                <H1>{error.title}</H1>
                <Text color={cv.text}>{error.subtitle}</Text>
            </CenterLayout>
        );
    }

    return (
        <CenterLayout minHeight="100vh" width="420px">
            <Box>
                <BoxHeader>
                    <Image src={OpizeLogo} height={24} width={24} alt="Opize 로고" />
                    <Text size="16px">
                        <Span weight="semibold">Opize 계정</Span>으로 로그인
                    </Text>
                </BoxHeader>
                <BoxContent>
                    <Titles>
                        <Img src={project?.iconUrl} alt="" />
                        <H1>{message.title}</H1>
                        <Text>로그인할 계정을 선택하세요</Text>
                    </Titles>

                    <Flex.Column>
                        {user && (
                            <UserBlock email={user.email} image={user.imageUrl} name={user.name} onClick={emailLogin} />
                        )}
                        <OtherUserBlock
                            moveLink={`/auth/login?redirectUrl=/oauth/verify/${projectCode}?redirectUrl=${redirectUrl}`}
                        />
                    </Flex.Column>
                </BoxContent>
            </Box>
        </CenterLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const projectCode = context.query.projectCode as string;
    let error: {
        title: string;
        subtitle: string;
    } | null = null;

    let project: ProjectObject | null = null;
    try {
        project = await client.project.get({
            projectCode: projectCode,
        });
    } catch (err) {
        if (err instanceof APIResponseError) {
            if (err.status === 404) {
                error = {
                    title: '프로젝트를 찾을 수 없어요',
                    subtitle: `${projectCode} 프로젝트를 찾을 수 없어요.`,
                };
            } else {
                error = {
                    title: '문제가 발생했어요.',
                    subtitle: `알 수 없는 문제가 발생했어요.`,
                };
            }
        } else {
            error = {
                title: '문제가 발생했어요.',
                subtitle: '서버가 응답하지 않았어요.',
            };
        }
    }

    return {
        props: {
            projectCode,
            project,
            error,
        },
    };
};
