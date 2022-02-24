import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import { HorizontalLayout, ColorBtn, FormInput } from 'opize-components'

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
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            code: "",
            url: "",
            icon: "",
            desc: "",
            ruleUrl: "",
            apiServer: ""
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
                    apiServer: data.apiServer,
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
        <HorizontalLayout label={'프로젝트 추가'} marginTop={16}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Inputs>
                    <Controller
                        name="name" 
                        control={control}
                        rules={{required: 'name을 입력해주세요.'}}
                        render={({field}) => <FormInput {...field} label={'name'} ref={null} error={errors.name} type="text" autoComplete="off"/>}
                    />
                    <Controller
                        name="code" 
                        control={control}
                        rules={{required: 'code를 입력해주세요.'}}
                        render={({field}) => <FormInput placeholder="code는 이후에 변경할 수 없습니다." {...field} label={'code'} ref={null} error={errors.code} type="text" autoComplete="off" />}
                    />
                    <Controller
                        name="url" 
                        control={control}
                        rules={{required: 'url을 입력해주세요.'}}
                        render={({field}) => <FormInput {...field} label={'url'} ref={null} error={errors.url} type="text" autoComplete="off" />}
                    />
                    <Controller
                        name="icon" 
                        control={control}
                        rules={{required: 'icon을 입력해주세요.'}}
                        render={({field}) => <FormInput {...field} label={'icon'} ref={null} error={errors.icon} type="text" autoComplete="off" />}
                    />
                    <Controller
                        name="desc" 
                        control={control}
                        rules={{required: 'desc을 입력해주세요.'}}
                        render={({field}) => <FormInput {...field} label={'desc'} ref={null} error={errors.desc} type="text" autoComplete="off" />}
                    />
                    <Controller
                        name="ruleUrl" 
                        control={control}
                        rules={{required: 'ruleUrl을 입력해주세요.'}}
                        render={({field}) => <FormInput {...field} label={'ruleUrl'} ref={null} error={errors.ruleUrl} type="text" autoComplete="off" />}
                    />
                    <Controller
                        name="apiServer" 
                        control={control}
                        rules={{required: 'apiServer을 입력해주세요.'}}
                        render={({field}) => <FormInput {...field} label={'apiServer'} ref={null} error={errors.apiServer} type="text" autoComplete="off" />}
                    />
                </Inputs>
                <Btns>
                    <ColorBtn type="submit" isLoading={isLoading} label={'프로젝트 추가'} />
                </Btns>
            </Form>
        </HorizontalLayout>
    )
}