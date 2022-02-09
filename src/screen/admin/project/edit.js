import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import Project from '../../../components/admin/project';
import RowMenu from '../../../components/row/rowMenu';
import { ColorBtnSubmit } from '../../../components/btns/btns';
import LoginInput from '../../../components/inputs/loginInput'
import { useNavigate, useSearchParams } from 'react-router-dom';

const Divver = styled.div`
    margin-top: 16px;
`

const Form = styled.form`
    width: 100%;
`

const Inputs = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const Btns = styled.div`
    margin-top: 20px;
    width: fit-content;
    float: right;
`

export default function Create(props) {
    const { t } = useTranslation('translation')
    const [searchParams] = useSearchParams();
    const [isLoading, setLoading] = useState(false);
    const [ projectCode, setProjectCode ] = useState(searchParams.get('projectCode'))
    const [ originalProject, setOriginalProject ] = useState({})
    const { control, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            code: "",
            url: "",
            icon: "",
            desc: "",
            ruleUrl: "",
            leaderDeveloperId: ""
        }
    });
    const navigate = useNavigate()

    useEffect(() => {
        setProjectCode(searchParams.get('projectCode'))
    }, [searchParams, setProjectCode])

    useEffect(() => {
        (async () => {
            console.log(projectCode)
            if (projectCode) {
                try {
                    const res = await instance.get(`/project/${projectCode}`)
                    reset({
                        name: res.data.name,
                        url: res.data.url,
                        icon: res.data.icon,
                        desc: res.data.desc,
                        ruleUrl: res.data.ruleUrl,
                        leaderDeveloperId: res.data.leaderDeveloperId
                    })
                    setOriginalProject(res.data)
                    console.log(res.data)
                } catch (err) {
                    console.error(err)
                }
            } else {
                navigate('/admin/project')
                toast.info('리스트에서 편집할 프로젝트를 선택하세요.')
            }
        })()
    }, [projectCode, reset, navigate])

    const onSubmit = async (data) => {
        if (!isLoading) {
            try {
                setLoading(true)
                await instance.patch(`/project/${projectCode}`, {
                    name: data.name,
                    url: data.url,
                    icon: data.icon,
                    desc: data.desc,
                    ruleUrl: data.ruleUrl,
                    leaderDeveloperId: data.leaderDeveloperId
                });
                setLoading(false)
                toast.info('프로젝트를 수정했습니다.')
                navigate('/admin/project')
            } catch (err) {
                setLoading(false)
                if (err.response) {
                    if (err.response.data.code === "user_not_found") {
                        toast.error(t('err_user_not_found'))
                    } else if (err.response.data.code === "token_expired") {
                        toast.error(t('err_token_expired'))
                    } else if (err.response.data.code === "invalid_token") {
                        toast.error(t('err_invalid_token'))
                    } else if (err.response.data.code === "wrong_password") {
                        toast.error(t('err_wrong_password'))
                    } else if (err.response.data.code === "already_project_exist") {
                        toast.info('동일한 코드의 프로젝트가 존재합니다.')
                    } else {
                        toast.error(err.message)
                        console.error(err)
                    }
                } else {
                    toast.error(err.message)
                    console.error(err)
                }
                
            }
        }
    };

    return (
        <Divver>
            <Project {...originalProject} />
            <RowMenu name={'프로젝트 편집'} marginTop={16}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Inputs>
                        <Controller
                            name="name" 
                            control={control}
                            rules={{required: 'name을 입력해주세요.'}}
                            render={({field}) => <LoginInput {...field} name={'name'} ref={null} error={errors.name} type="text" autoComplete="off"/>}
                        />
                        <Controller
                            name="url" 
                            control={control}
                            rules={{required: 'url을 입력해주세요.'}}
                            render={({field}) => <LoginInput {...field} name={'url'} ref={null} error={errors.url} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="icon" 
                            control={control}
                            rules={{required: 'icon을 입력해주세요.'}}
                            render={({field}) => <LoginInput {...field} name={'icon'} ref={null} error={errors.icon} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="desc" 
                            control={control}
                            rules={{required: 'desc을 입력해주세요.'}}
                            render={({field}) => <LoginInput {...field} name={'desc'} ref={null} error={errors.desc} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="ruleUrl" 
                            control={control}
                            rules={{required: 'ruleUrl을 입력해주세요.'}}
                            render={({field}) => <LoginInput {...field} name={'ruleUrl'} ref={null} error={errors.ruleUrl} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="leaderDeveloperId" 
                            control={control}
                            rules={{required: 'leaderDeveloperId를 입력해주세요.'}}
                            render={({field}) => <LoginInput {...field} name={'leaderDeveloperId'} ref={null} error={errors.leaderDeveloperId} type="text" autoComplete="off" />}
                        />
                    </Inputs>
                    <Btns>
                        <ColorBtnSubmit isLoading={isLoading} text={'프로젝트 편집'} />
                    </Btns>
                </Form>
            </RowMenu>
        </Divver>
    )
}