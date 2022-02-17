import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';

import OpizeLogo from '../../../assets/opize.png'

import { CodeBlock, HorizontalLayout, Checkbox, ColorBtn, FormInput } from 'opize-components'

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
    const [ userId, setUserId ] = useState(searchParams.get('userId'))
    const [ originalData, setOriginalData ] = useState({})
    const { control, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            isVerify: true,
            profileImage: "",
            isMarketingAccept: true,
            roles: "",
        }
    });
    const navigate = useNavigate()

    useEffect(() => {
        setUserId(searchParams.get('userId'))
    }, [searchParams, setUserId])

    useEffect(() => {
        (async () => {
            if (userId) {
                try {
                    const res = await instance.get(`/admin/user/${userId}`)
                    reset({
                        name: res.data.name,
                        isVerified: res.data.isVerified,
                        profileImage: res.data.profileImage,
                        isMarketingAccept: res.data.isMarketingAccept,
                        roles: JSON.stringify(res.data.roles),
                    })
                    setOriginalData(res.data)
                } catch (err) {
                    console.error(err)
                }
            } else {
                navigate('/admin/user')
                toast.info('리스트에서 편집할 유저를 선택하세요.')
            }
        })()
    }, [userId, reset, navigate])

    const onSubmit = async (data) => {
        if (!isLoading) {
            try {
                setLoading(true)
                await instance.patch(`/admin/user/${userId}`, {
                    name: data.name,
                    isVerified: data.isVerified,
                    profileImage: data.profileImage,
                    isMarketingAccept: data.isMarketingAccept,
                    roles: data.roles,
                });
                setLoading(false)
                toast.info('유저를 수정했습니다.')
                navigate('/admin/user')
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
            <CodeBlock
                title={originalData.name}
                icon={originalData.icon || OpizeLogo}
                subtitle={originalData.email}
                desc={originalData._id}
                links={[
                    { text: '자세한 정보', to: `/admin/user/detail?userId=${originalData._id}` },
                    { text: '편집', to: `/admin/user/edit?userId=${originalData._id}` },
                ]}>
                {JSON.stringify(originalData, null, 4)}
            </CodeBlock>
            <HorizontalLayout label={'유저 편집'} marginTop={16}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Inputs>
                        <Controller
                            name="name" 
                            control={control}
                            rules={{required: 'name을 입력해주세요.'}}
                            render={({field}) => <FormInput {...field} label={'name'} ref={null} error={errors.name} type="text" autoComplete="off"/>}
                        />
                        <Controller
                            name="profileImage" 
                            control={control}
                            rules={{required: 'profileImage를 입력해주세요.'}}
                            render={({field}) => <FormInput {...field} label={'profileImage'} ref={null} error={errors.profileImage} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="roles" 
                            control={control}
                            rules={{required: 'roles을 입력해주세요.'}}
                            render={({field}) => <FormInput {...field} label={'roles'} ref={null} error={errors.roles} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="isVerified"
                            control={control}
                            render={({field}) => <Checkbox {...field} label={'isVerified'} ref={null} error={errors.isVerified}/>}
                        />
                        <Controller
                            name="isMarketingAccept" 
                            control={control}
                            render={({field}) => <Checkbox {...field} label={'isMarketingAccept'} ref={null} error={errors.isMarketingAccept}/>}
                        />
                    </Inputs>
                    <Btns>
                        <ColorBtn type="submit" isLoading={isLoading} text={'유저 편집'} />
                    </Btns>
                </Form>
            </HorizontalLayout>
        </Divver>
    )
}