/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { APIResponseError, ProjectObject } from 'opize-client';
import { cv, PageLayout, Spinner, Text } from 'opize-design-system';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { client } from '../../../../utils/opizeClient';
import { josa } from 'josa';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Center = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 400px;
`;

const Img = styled.img`
    width: 48px;
    height: 48px;
`;

const H1 = styled.h1`
    font-size: 28px;
    margin-top: 8px;
`;

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

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState({
        title: `${josa(`${project?.name}#{으로}`)} 이동합니다.`,
        subtitle: '잠시만 기다려주세요',
    });

    useEffect(() => {
        if (!project) return;

        if (!redirectUrl) {
            setIsError(true);
            setMessage({
                title: '문제가 발생했어요',
                subtitle: '리다이렉트 주소가 없어요.',
            });
            return;
        }

        (async () => {
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
        })();
    }, [project, redirectUrl]);

    if (error) {
        return (
            <PageLayout width="400px">
                <Center>
                    <H1>{error.title}</H1>
                    <Text color={cv.text3}>{error.subtitle}</Text>
                </Center>
            </PageLayout>
        );
    }

    return (
        <PageLayout width="400px">
            <Center>
                <Img src={project?.iconUrl} alt="" />
                <H1>{message.title}</H1>
                <Text color={cv.text3}>{message.subtitle}</Text>
                <br />
                {!isError && <Spinner />}
            </Center>
        </PageLayout>
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
