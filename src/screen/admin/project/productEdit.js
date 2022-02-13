import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import Project from '../../../components/admin/project';
import Product from '../../../components/admin/product';
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

const Header = styled.div`
    margin-top: 16px;
    margin-bottom: 8px;
    padding-bottom: 4px;
    font-size: 16px;
    border-bottom: solid 1px var(--grey1);
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
            console.log(projectCode)
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
                console.log(res.data)
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
            <Project {...originalProject} />

            <Header>product</Header>
            <Product key={originalProduct.code} {...originalProduct} />

            <RowMenu name={'상품 편집'} marginTop={16}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Inputs>
                        <Controller
                            name="name" 
                            control={control}
                            rules={{required: 'name을 입력해주세요.'}}
                            render={({field}) => <LoginInput {...field} name={'name'} ref={null} error={errors.name} type="text" autoComplete="off"/>}
                        />
                        <Controller
                            name="icon" 
                            control={control}
                            rules={{required: 'icon을 입력해주세요.'}}
                            render={({field}) => <LoginInput {...field} name={'icon'} ref={null} error={errors.icon} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="priceKRW" 
                            control={control}
                            rules={{required: 'priceKRW을 입력해주세요.'}}
                            render={({field}) => <LoginInput {...field} name={'priceKRW'} ref={null} error={errors.priceKRW} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="billingInterval" 
                            control={control}
                            rules={{required: 'billingInterval을 입력해주세요.'}}
                            render={({field}) => <LoginInput placeholder="1d, 1M, 1y" {...field} name={'billingInterval'} ref={null} error={errors.billingInterval} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="url" 
                            control={control}
                            rules={{required: 'url을 입력해주세요.'}}
                            render={({field}) => <LoginInput {...field} name={'url'} ref={null} error={errors.url} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="desc" 
                            control={control}
                            rules={{required: 'desc을 입력해주세요.'}}
                            render={({field}) => <LoginInput {...field} name={'desc'} ref={null} error={errors.desc} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="status" 
                            control={control}
                            rules={{required: 'status를 입력해주세요.'}}
                            render={({field}) => <LoginInput placeholder="SALE, STOP" {...field} name={'status'} ref={null} error={errors.status} type="text" autoComplete="off" />}
                        />
                    </Inputs>
                    <Btns>
                        <ColorBtnSubmit isLoading={isLoading} text={'상품 편집'} />
                    </Btns>
                </Form>
            </RowMenu>
        </Divver>
    )
}