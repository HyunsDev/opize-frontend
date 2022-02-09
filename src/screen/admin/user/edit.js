import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import instance from '../../../src/instance';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import { User } from '../../../components/admin/user';
import RowMenu from '../../../components/row/rowMenu';
import CheckBox from "../../../components/inputs/checkbox"
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
            <User id={userId} {...originalData} />
            <RowMenu name={'유저 편집'} marginTop={16}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Inputs>
                        <Controller
                            name="name" 
                            control={control}
                            rules={{required: 'name을 입력해주세요.'}}
                            render={({field}) => <LoginInput {...field} name={'name'} ref={null} error={errors.name} type="text" autoComplete="off"/>}
                        />
                        <Controller
                            name="profileImage" 
                            control={control}
                            rules={{required: 'profileImage를 입력해주세요.'}}
                            render={({field}) => <LoginInput {...field} name={'profileImage'} ref={null} error={errors.profileImage} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="roles" 
                            control={control}
                            rules={{required: 'roles을 입력해주세요.'}}
                            render={({field}) => <LoginInput {...field} name={'roles'} ref={null} error={errors.roles} type="text" autoComplete="off" />}
                        />
                        <Controller
                            name="isVerified"
                            control={control}
                            render={({field}) => <CheckBox {...field} text={<>isVerified</>} ref={null} error={errors.isVerified}/>}
                        />
                        <Controller
                            name="isMarketingAccept" 
                            control={control}
                            render={({field}) => <CheckBox {...field} text={<>isMarketingAccept</>} ref={null} error={errors.isMarketingAccept}/>}
                        />
                    </Inputs>
                    <Btns>
                        <ColorBtnSubmit isLoading={isLoading} text={'유저 편집'} />
                    </Btns>
                </Form>
            </RowMenu>
        </Divver>
    )
}