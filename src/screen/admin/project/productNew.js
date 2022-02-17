import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { CodeBlock, HorizontalLayout, ColorBtn, FormInput } from 'opize-components'


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

export default function Create() {
    const { t } = useTranslation('translation')
    const [searchParams] = useSearchParams();
    const [isLoading, setLoading] = useState(false);
    const [ projectCode, setProjectCode ] = useState(searchParams.get('projectCode'))
    const [ originalProject, setOriginalProject ] = useState({})
    const { control, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            code: "",
            icon: "",
            priceKRW: "",
            paymentKind: "",
            billingInterval: "",
            url: "",
            desc: "",
        }
    });
    const navigate = useNavigate()

    useEffect(() => {
        setProjectCode(searchParams.get('projectCode'))
    }, [searchParams, setProjectCode])

    useEffect(() => {
        (async () => {
            if (projectCode) {
                try {
                    const res = await instance.get(`/project/${projectCode}`)
                    setOriginalProject(res.data)
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
                await instance.post(`/project/${projectCode}/product`, {
                    name: data.name,
                    code: data.code,
                    icon: data.icon,
                    prices: {
                        KRW: data.priceKRW
                    },
                    paymentKind: data.paymentKind,
                    billingInterval: data.billingInterval,
                    url: data.url,
                    desc: data.desc
                });
                setLoading(false)
                toast.info('상품을 생성했습니다.')
                navigate(`/admin/project/product?projectCode=${projectCode}`)
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
                    if (err.response) console.error(err.response.data)
                    toast.error(err.message)
                    console.error(err)
                }
                
            }
        }
    };

    return (
        <Divver>
            <CodeBlock key={originalProject.name}
                    icon={originalProject.icon}
                    title={originalProject.name}
                    subtitle={originalProject.code}
                    desc={originalProject.desc}
                    links={[
                        { text: '새로운 상품', to: `/admin/project/product/new?projectCode=${originalProject.code}` },
                        { text: '상품', to: `/admin/project/product?projectCode=${originalProject.code}` },
                        { text: '편집', to: `/admin/project/edit?projectCode=${originalProject.code}` },
                    ]}
                >{JSON.stringify(originalProject, null, 4)}</CodeBlock>

            <HorizontalLayout label={'상품 생성'} marginTop={16}>
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
                            render={({field}) => <FormInput {...field} label={'code'} ref={null} error={errors.code} type="text" autoComplete="off"/>}
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
                            name="priceKRW" 
                            control={control}
                            rules={{required: 'priceKRW을 입력해주세요.'}}
                            render={({field}) => <FormInput {...field} label={'priceKRW'} ref={null} error={errors.priceKRW} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="paymentKind" 
                            control={control}
                            rules={{required: 'paymentKind을 입력해주세요.'}}
                            render={({field}) => <FormInput placeholder="billing, normal" {...field} label={'paymentKind'} ref={null} error={errors.paymentKind} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="billingInterval" 
                            control={control}
                            rules={{required: 'billingInterval을 입력해주세요.'}}
                            render={({field}) => <FormInput placeholder="1d, 1M, 1y" {...field} label={'billingInterval'} ref={null} error={errors.billingInterval} type="text" autoComplete="off" />}
                        />
                    </Inputs>
                    <Btns>
                        <ColorBtn type='submit' isLoading={isLoading} label={'상품'} />
                    </Btns>
                </Form>
            </HorizontalLayout>
        </Divver>
    )
}