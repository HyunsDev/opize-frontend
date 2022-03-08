/* eslint-disable no-unused-vars */
import styled from "styled-components"
import axios from "axios"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next';

import OpizeLogoImg from '../../assets/opize.png'
import OpizeLogoTextImg from '../../assets/opize_text_1.png'

import { Button, TextField } from 'opize-components'

const Divver = styled.div`
    padding: 8px;
    width: 400px;
    margin: 0 auto;
    margin-top: 200px;
`

const Logos = styled(Link)`
    display: flex;
    align-items: center;
    gap: 8px;
`

const Logo = styled.img`
    height: 28px;
`

const LogoText = styled.img`
    height: 24px;
    margin-top: 4px;
`

const H1 = styled.h1`
    font-size: 24px;
    font-weight: 800;
    margin: 12px 0px;;
`

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const LoginMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
`

const Left = styled.div`
    color: #747474;
`

const A = styled(Link)`
    font-size: 14px;
    color: #747474;
    text-decoration: none;
`

const Right = styled.div`

`

export default function Login (props) {
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [ searchParams ] = useSearchParams()
    const { t } = useTranslation('translation')

    useEffect(() => {
        document.title = `${t("auth_change_password_page_title")} - Opize`
    }, [t])

    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            password: "",
            passwordRetry: ""
        }
    });

    const onSubmit = async (data) => {
        if (!isLoading) {
            try {
                setLoading(true)
                await axios.post(`${process.env.REACT_APP_API_SERVER}/auth/reset-password`, {
                    email: searchParams.get('email'),
                    code: searchParams.get('code'),
                    password: data.password,
                });
                setLoading(false)
                toast.info(t('auth_change_password_toast'))
                navigate('/login')
            } catch (err) {
                setLoading(false)
                if (err.response) {
                    if (err.response.data.code === "invalid_token") {
                        toast.error(t('err_invalid_token'))
                    } else if (err.response.data.code === "user_not_found") {
                        toast.error(t('err_invalid_token'))
                    } else {
                        toast.error(err.message)
                        console.error(err.response)
                    }
                } else {
                    toast.error(err.message)
                    console.error(err)
                }
            }
        }
    };

    return (
        <>
            <Divver>
                <Logos to='/'>
                    <Logo src={OpizeLogoImg}/>
                    <LogoText src={OpizeLogoTextImg} />
                </Logos>
                <H1>{t('auth_reset')}</H1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Inputs>
                        <Controller
                            name="password" 
                            control={control}
                            rules={{required:t('auth_input_password_required'), minLength: {
                                value: 8,
                                message: t('auth_input_password_pattern')
                              }}}
                            render={({field}) => <TextField {...field} label={t('auth_input_new_password')} ref={null} message={errors.password} error={errors.password} type="password" autoComplete="new-password" />}
                        />
                        <Controller
                            name="passwordRetry" 
                            control={control}
                            rules={{required: t('auth_input_password_retry_required'), validate: (value) =>  value === watch('password') || t('auth_input_password_retry_validate') }}
                            render={({field}) => <TextField {...field} label={t('auth_input_password_retry')} ref={null} message={errors.passwordRetry} error={errors.passwordRetry} type="password" autoComplete="new-password" />}
                        />

                    </Inputs>

                    <LoginMenu>
                        <Left>
                            <A to="/login">{t('auth_login')}</A>
                        </Left>
                        <Right>
                            <Button color='teal' type="submit" isLoading={isLoading} label={t('auth_reset')} />
                        </Right>
                    </LoginMenu>
                </form>
            </Divver>
        </>
    )
}