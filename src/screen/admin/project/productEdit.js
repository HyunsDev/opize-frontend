import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { CodeBlock, HorizonLayout, Button, TextField } from 'opize-components'

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

const CodeBlocks = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export default function Create(props) {
    const { t } = useTranslation('translation')
    const [searchParams] = useSearchParams();
    const [isLoading, setLoading] = useState(false);
    const [ projectCode, setProjectCode ] = useState(searchParams.get('projectCode'))
    const [ productCode, setProductCode ] = useState(searchParams.get('productCode'))
    const [ originalProduct, setOriginalProduct ] = useState({})
    const [ originalProject, setOriginalProject ] = useState({})
    const { control, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            icon: "",
            priceKRW: 0,
            billingInterval: '',
            status: '',
            url: "",
            desc: ""
        }
    });
    const navigate = useNavigate()

    useEffect(() => {
        setProjectCode(searchParams.get('projectCode'))
        setProductCode(searchParams.get('productCode'))
    }, [searchParams, setProjectCode, setProductCode])

    useEffect(() => {
        (async () => {
            if (projectCode) {
                try {
                    const res = await instance.get(`/project/${projectCode}/product/${productCode}`)
                    reset({
                        name: res.data.name,
                        icon: res.data.icon,
                        priceKRW: res.data.prices.KRW,
                        billingInterval: res.data.billingInterval,
                        status: res.data.status,
                        url: res.data.url,
                        desc: res.data.desc,
                    })
                    setOriginalProduct(res.data)
                } catch (err) {
                    console.error(err)
                }
            } else {
                navigate('/admin/project')
                toast.info('리스트에서 편집할 프로젝트를 선택하세요.')
            }
        })()
    }, [projectCode, reset, navigate, productCode])

    useEffect(() => {
        (async () => {
            try {
                const res = await instance.get(`/project/${projectCode}`)
                setOriginalProject(res.data)
            } catch (err) {
                toast.error(err.message)
                console.error(err)
            }
        })()
    }, [projectCode, productCode, setOriginalProduct])

    const onSubmit = async (data) => {
        if (!isLoading) {
            try {
                setLoading(true)
                await instance.patch(`/project/${projectCode}/product/${productCode}`, {
                    name: data.name,
                    icon: data.icon,
                    prices: {
                        KRW: data.priceKRW,
                    },
                    billingInterval:data.billingInterval,
                    status: data.status,
                    url: data.url,
                    desc: data.desc,
                });
                setLoading(false)
                toast.info('상품을 수정했습니다.')
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
                    toast.error(err.message)
                    console.error(err)
                }
                
            }
        }
    };

    return (
        <Divver>
            <CodeBlocks>
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
                <CodeBlock key={originalProduct.code}
                    icon={originalProduct.icon}
                    title={originalProduct.name}
                    subtitle={originalProduct.code}
                    desc={originalProduct.desc}
                    links={[
                        {
                            text: originalProduct.paymentKind === 'billing' ? "구독" : '결제',
                            to: `/${originalProduct.paymentKind === 'billing' ? 'subscribe' : 'payment'}?projectCode=${originalProject.code}&productCode=${originalProduct.code}`
                        },
                        { text: '편집', to: `/admin/project/product/edit?projectCode=${originalProject.code}&productCode=${originalProduct.code}` }
                    ]}
                >{JSON.stringify(originalProduct, null, 4)}</CodeBlock>
            </CodeBlocks>

            <HorizonLayout label={'상품 편집'} marginTop={16}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Inputs>
                        <Controller
                            name="name" 
                            control={control}
                            rules={{required: 'name을 입력해주세요.'}}
                            render={({field}) => <TextField {...field} label={'name'} ref={null} message={errors.name} error={errors.name} type="text" autoComplete="off"/>}
                        />
                        <Controller
                            name="icon" 
                            control={control}
                            rules={{required: 'icon을 입력해주세요.'}}
                            render={({field}) => <TextField {...field} label={'icon'} ref={null} message={errors.icon} error={errors.icon} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="priceKRW" 
                            control={control}
                            rules={{required: 'priceKRW을 입력해주세요.'}}
                            render={({field}) => <TextField {...field} label={'priceKRW'} ref={null} message={errors.priceKRW} error={errors.priceKRW} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="billingInterval" 
                            control={control}
                            rules={{required: 'billingInterval을 입력해주세요.'}}
                            render={({field}) => <TextField placeholder="1d, 1M, 1y" {...field} label={'billingInterval'} ref={null} message={errors.billingInterval} error={errors.billingInterval} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="url" 
                            control={control}
                            rules={{required: 'url을 입력해주세요.'}}
                            render={({field}) => <TextField {...field} label={'url'} ref={null} message={errors.url} error={errors.url} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="desc" 
                            control={control}
                            rules={{required: 'desc을 입력해주세요.'}}
                            render={({field}) => <TextField {...field} label={'desc'} ref={null} message={errors.desc} error={errors.desc} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="status" 
                            control={control}
                            rules={{required: 'status를 입력해주세요.'}}
                            render={({field}) => <TextField placeholder="SALE, STOP" {...field} label={'status'} ref={null} message={errors.status} error={errors.status} type="text" autoComplete="off" />}
                        />
                    </Inputs>
                    <Btns>
                        <Button color='teal' type='submit' isLoading={isLoading} label={'상품 편집'} />
                    </Btns>
                </Form>
            </HorizonLayout>
        </Divver>
    )
}