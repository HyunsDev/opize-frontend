import {
    PageHead,
    PageLayout,
    Button,
    Input,
    TextArea,
    Text,
    Flex,
    useTopLoading,
    PaneList,
    Box,
    Switch,
    cv,
    A,
    useModal,
    Modal,
    ButtonGroup,
} from 'opize-design-system';

import { client } from '../../../../../utils/opizeClient';
import { APIResponseError, ProjectObject } from 'opize-client';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AdminProjectHeader } from '../../../../../components/page/admin/project/adminProjectHeader';
import { ChangeEvent, useEffect, useState } from 'react';
import { AdminFooter } from '../../../../../components/page/admin/adminFooter';
import Link from 'next/link';
import { Warning } from 'phosphor-react';

const URL_REGEX = /http[s]?:\/\//;

interface StatusBoxProps {
    project?: ProjectObject;
    refetch: () => void;
}
function StatusBox({ project, refetch }: StatusBoxProps) {
    const [isLoading, setIsLoading] = useState(false);

    const onChange = async (e: any) => {
        if (!project) return;
        setIsLoading(true);
        try {
            await client.project.patch({
                projectCode: project.code,
                isOAuthAble: !project?.isOAuthAble,
            });
            refetch();
        } catch (error) {
            if (error instanceof APIResponseError) {
                toast.warn(`🤖 ${error.message || '문제가 발생했어요.'}`);
            } else {
                toast.error('서버에 연결할 수 없어요.');
            }
        }
        setIsLoading(false);
    };

    return (
        <Box title="OAuth 인증 활성화">
            <Text color={cv.gray500} size="14px">
                Opize 인증을 비활성화 한 경우, 새로운 OAuth 인증이 차단됩니다. 이미 OAuth 인증을 받은 사용자에는 영향을
                미치지 않습니다.
            </Text>
            <Switch checked={project?.isOAuthAble} onChange={onChange}>
                OAuth 인증 활성화
            </Switch>
        </Box>
    );
}

interface OAuthOverviewProps {
    project?: ProjectObject;
    refetch: () => void;
}
function OAuthOverview({ project, refetch }: OAuthOverviewProps) {
    const [tokenText, setTokenText] = useState('secret_**************************');
    const modal = useModal();

    const regenerateToken = async () => {
        if (!project) return;
        const apiRequest = async () => {
            try {
                const res = await client.project.oauth.post({
                    projectCode: project?.code,
                });
                setTokenText(res.token);
                toast.info('새로운 토큰이 발급되었어요. 이 토큰은 이 화면에서만 확인할 수 있어요.');
                refetch();
            } catch (error) {
                if (error instanceof APIResponseError) {
                    toast.warn(`🤖 ${error.message || '문제가 발생했어요.'}`);
                } else {
                    toast.error('서버에 연결할 수 없어요.');
                }
            }
        };

        modal.open(
            <Modal>
                <Modal.Header>정말로 토큰을 재발급 하실 건가요?</Modal.Header>
                <Modal.Content>토큰을 재발급하면 이전에 사용하던 토큰은 더 이상 사용할 수 없어요.</Modal.Content>
                <Modal.Footer>
                    <Button variant="tertiary" onClick={() => modal.close()}>
                        취소
                    </Button>
                    <Button variant="contained" color="red" onClick={() => apiRequest()}>
                        재발급
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    return (
        <Box title="OAuth 정보">
            <Flex.Row gap="16px">
                <Text>프로젝트 코드</Text>
                <Input value={project?.code} readOnly width="300px" onChange={() => null} />
            </Flex.Row>

            <Text color={cv.label} size="14px">
                Project Secret Token
            </Text>
            <Flex.Row gap="8px">
                <Input value={tokenText} />
                <Button onClick={regenerateToken}>재발급</Button>
            </Flex.Row>
        </Box>
    );
}

interface RedirectUrlsBoxProps {
    project?: ProjectObject;
    refetch: () => void;
}
function RedirectUrlsBox({ project, refetch }: RedirectUrlsBoxProps) {
    const [urlRaw, setUrlRaw] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (project?.redirectUrls) {
            setUrlRaw(project.redirectUrls.join('\n'));
        }
    }, [project]);

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setUrlRaw(value);
        const lines = value.split('\n');

        let errorLineNumber: number[] = [];
        lines.forEach((line, i) => {
            if (!URL_REGEX.test(line)) {
                errorLineNumber.push(i + 1);
            }
        });

        if (errorLineNumber.length !== 0) {
            setErrorMessage(`${errorLineNumber.join(', ')}번째 URL의 형식이 잘못되었어요.`);
        } else {
            setErrorMessage('');
        }
    };

    const onSubmit = async () => {
        if (!project) return;

        const hasError = !urlRaw.split('\n').every((e) => URL_REGEX.test(e));
        const urls = urlRaw.split('\n');
        if (hasError) return;

        setIsLoading(true);
        try {
            await client.project.patch({
                projectCode: project.code,
                redirectUrls: urls,
            });
            refetch();
        } catch (error: unknown) {
            if (error instanceof APIResponseError) {
                toast.warn(`🤖 ${error.message || '문제가 발생했어요.'}`);
            } else {
                toast.error('서버에 연결할 수 없어요.');
            }
        }
        setIsLoading(false);
    };

    return (
        <Box
            title="Redirect URL"
            footer={
                <>
                    <Text>
                        <A href="" target={'_blank'} showIcon>
                            Redirect URL에 대해 자세히 알아보기
                        </A>
                    </Text>
                    <Button
                        disabled={errorMessage !== ''}
                        width="60px"
                        onClick={onSubmit}
                        primary
                        isLoading={isLoading}
                    >
                        적용
                    </Button>
                </>
            }
        >
            <TextArea
                value={urlRaw}
                onChange={onChange}
                label="Redirect URLs"
                error={errorMessage}
                placeholder="ex. https://opize.me/oauth/opize"
            />
            <Text color={cv.gray500} size="14px">
                Opize OAuth에서, 사용자가 OAuth를 통해 인증을 받은 후 위 링크로 이동됩니다. 프로토콜과 정확한 경로를
                포함해야 하며, 와일드 카드(*, .)는 이용할 수 없습니다. 이후 API 요청시 위 링크중 하나를 함께 전송해야
                합니다.
            </Text>
        </Box>
    );
}

export default function App() {
    const router = useRouter();
    const projectCode = router.query.projectCode as string;

    const { isLoading: userLoading, data: user } = useQuery(['user'], () => client.user.get({ userId: 'me' }), {});
    const {
        isLoading: projectLoading,
        data: project,
        refetch: projectRefetch,
    } = useQuery(['admin', 'project', projectCode], () =>
        client.project.get({
            projectCode,
        })
    );

    if (!userLoading && !user?.roles?.includes('admin')) {
        toast.warn('접근 권한이 없어요.');
        router.push('/dashboard');
    }

    return (
        <>
            <AdminProjectHeader projectCode={projectCode} menu="setting" />
            <PageHead title={'Project Setting'}></PageHead>
            <PageLayout gap="20px">
                <PageLayout.Pane>
                    <PaneList isSticky>
                        <Link
                            passHref
                            href={`/admin/project/[projectCode]/setting`}
                            as={`/admin/project/${router.query.projectCode}/setting`}
                        >
                            <PaneList.Item>프로젝트 정보</PaneList.Item>
                        </Link>

                        <Link
                            passHref
                            href={`/admin/project/[projectCode]/setting/oauth`}
                            as={`/admin/project/${router.query.projectCode}/setting/oauth`}
                        >
                            <PaneList.Item selected>OAuth</PaneList.Item>
                        </Link>
                    </PaneList>
                </PageLayout.Pane>
                <PageLayout.Content>
                    <Flex.Column gap="20px">
                        <Text size="24px">OAuth</Text>
                        <StatusBox project={project} refetch={projectRefetch} />
                        <OAuthOverview project={project} refetch={projectRefetch} />
                        <RedirectUrlsBox project={project} refetch={projectRefetch} />
                    </Flex.Column>
                </PageLayout.Content>
            </PageLayout>
            <AdminFooter />
        </>
    );
}
