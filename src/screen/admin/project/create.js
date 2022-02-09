import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import RowMenu from '../../../components/row/rowMenu';
import { ColorBtnSubmit } from '../../../components/btns/btns';
import LoginInput from '../../../components/inputs/loginInput'

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
    const [isLoading, setLoading] = useState(false);
    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            code: "",
            url: "",
            icon: "",
            desc: "",
            ruleUrl: ""
        }
    });

    const onSubmit = async (data) => {
        if (!isLoading) {
            try {
                setLoading(true)
                await instance.post(`/project`, {
                    name: data.name,
                    code: data.code,
                    url: data.url,
                    icon: data.icon,
                    desc: data.desc,
                    ruleUrl: data.ruleUrl,
                });
                setLoading(false)
                toast.info('프로젝트를 생성했습니다.')
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
        <RowMenu name={'프로젝트 추가'} marginTop={16}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Inputs>
                    <Controller
                        name="name" 
                        control={control}
                        rules={{required: 'name을 입력해주세요.'}}
                        render={({field}) => <LoginInput {...field} name={'name'} ref={null} error={errors.name} type="text" autoComplete="off"/>}
                    />
                    <Controller
                        name="code" 
                        control={control}
                        rules={{required: 'code를 입력해주세요.'}}
                        render={({field}) => <LoginInput {...field} name={'code'} ref={null} error={errors.code} type="text" autoComplete="off" />}
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
                </Inputs>
                <Btns>
                    <ColorBtnSubmit isLoading={isLoading} text={'프로젝트 추가'} />
                </Btns>
            </Form>
        </RowMenu>
    )
}