/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ProjectObject } from 'opize-client';
import { cv, PageLayout, Spinner, Text } from 'opize-design-system';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { client } from '../../../../utils/opizeClient';
import { josa } from 'josa';
import Image from 'next/image';
import { useEffect } from 'react';

const Center = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 300px;
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
    project: ProjectObject;
}
export default function App({ projectCode, project }: AppProps) {
    const router = useRouter();
    const redirectUrl = router.query.redirectUrl;

    useEffect(() => {
        (async () => {
            console.log(redirectUrl);
        })();
    }, [redirectUrl]);

    return (
        <PageLayout width="400px">
            <Center>
                <Img src={project.iconUrl} alt="" />
                <H1>{josa(`${project?.name}#{으로}`)} 이동합니다.</H1>
                <Text color={cv.text3}>잠시만 기다려주세요.</Text>
                <br />
                <Spinner />
            </Center>
        </PageLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const projectCode = context.query.projectCode as string;
    const project = await client.project.get({
        projectCode: projectCode,
    });

    return {
        props: {
            projectCode,
            project,
        },
    };
};
