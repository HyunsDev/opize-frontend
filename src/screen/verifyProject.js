import { useContext, useEffect, useState } from 'react';
import { UserContext } from "../context/user";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { DashboardContext } from '../context/dashboard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Spinner } from 'opize-components'
import { HeaderWrapper } from '../components';
import { toast } from 'react-toastify';
import instance from '../src/instance';

const Divver = styled.div`
    margin: 0 auto;
    width: 400px;
    padding: 0 6px;
    margin-top: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Img = styled.img`
    width: 52px;
`

const Title = styled.h1`
    font-size: 24px;
`

const P = styled.p`
    color: var(--grey5);
`

const SpinnerDiv = styled.div`
    margin-top: 16px;
`

export default function Dashboard(props) {
    const { user, initUser } = useContext(UserContext)
    const { dashboard, initDashboard } = useContext(DashboardContext)
    const [ project, setProject ] = useState()
    const [ searchParams ] = useSearchParams()
    const navigate = useNavigate()
    const { t } = useTranslation('translation')

    useEffect(() => {
        document.title = `${t("login")} - Opize`
    }, [t])

    useEffect(() => {
        initDashboard()
        initUser()
    }, [initDashboard, initUser])

    // 서브 도메인 인증
    useEffect(() => {
        if (user.isVerified) {
            if (!dashboard.projects) return
            if (searchParams.get('projectGet')) {
                if (user.isVerified) {
                    const project = dashboard.projects[searchParams.get('projectGet')]
                    setProject(project)
                    if (project) {
                        // 프로젝트 인증 완료
                        ;(async () => {
                            try {
                                const res = await instance.post(`/project/login/${project.code}`)
                                console.log(res);
                                window.location.href = `${project.url}/verify?token=${localStorage.token}&projectToken=${res.data.token}`
                            } catch (err) {
                                if (err.response) {
                                    if (err.response.data.code === "user_not_found") {
                                        toast.error(t('err_user_not_found'))
                                    } else if (err.response.data.code === "token_expired") {
                                        toast.error(t('err_token_expired'))
                                    } else if (err.response.data.code === "invalid_token") {
                                        toast.error(t('err_invalid_token'))
                                    } else if (err.response.data.code === "wrong_password") {
                                        toast.error(t('err_wrong_password'))
                                    } else {
                                        toast.error(err.message)
                                        console.error(err.response)
                                    }
                                } else {
                                    toast.error(err.message)
                                    console.error(err)
                                }
                            }
                        })()

                        console.log(project)
                    } else {
                        navigate('/dashboard')
                    }
                } else {
                    navigate('/verity')
                }
            } else {
                navigate('/')
            }
        } else if (user.name) {
            navigate('/verify')
        }
    }, [user, searchParams, dashboard.projects, navigate, t])

    if (!project) {
        return (
            <>
                <HeaderWrapper app="dashboard" />
                <Divver>
                    <SpinnerDiv><Spinner size={32} color={'var(--grey7)'} /></SpinnerDiv>
                </Divver>
            </>
        )
    }

    return (
        <>
            <HeaderWrapper app="dashboard" />
            <Divver>
                <Img src={project?.icon} />
                <Title>{t('verifyProject_title', {name: project?.name})}</Title>
                <P>{t('verifyProject_text1')}</P>
                <SpinnerDiv><Spinner size={32} color={'var(--grey7)'} /></SpinnerDiv>
            </Divver>
        </>
    )
}