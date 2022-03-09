/* eslint-disable no-unused-vars */
import styled from "styled-components"
import axios from "axios"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";
import { UserContext } from "../../context/user"
import { toast } from "react-toastify"
import { useEffect, useState, useContext } from "react"
import { useTranslation } from 'react-i18next';

import OpizeLogoImg from '../../assets/opize.png'
import OpizeLogoTextImg from '../../assets/opize_text_1.png'

import { Button, Checkbox, TextField } from 'opize-components'

const H1 = styled.h1`
    font-size: 24px;
    font-weight: 800;
    margin: 12px 0px;;
`

const Divver = styled.div`
    padding: 8px;
    width: 400px;
    margin: 0 auto;
    margin-top: 100px;
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
    const { updateUser } = useContext(UserContext)
    const [ searchParams ] = useSearchParams()
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { t } = useTranslation('translation')

    useEffect(() => {
        document.title = `${t("auth_signup_page_title")} - Opize`
    }, [t])

    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            email: searchParams.get('email') || "",
            name: "",
            password: "",
            passwordRetry: "",
            privacy: false,
            marking: false
        }
    });

    const onSubmit = async (data) => {
        if (!isLoading) {
            try {
                setLoading(true)
                const res = await axios.post(`${process.env.REACT_APP_API_SERVER}/auth/sign-up`, {
                    email: data.email,
                    password: data.password,
                    name: data.name,
                    isMarketingAccept: String(data.marking)
                });
                setLoading(false)
                localStorage.setItem('token', res.data.token)
                updateUser()
                navigate('/verify')
            } catch (err) {
                setLoading(false)
                console.error(err)
                if (err.response) {
                    if (err.response.data.code === "already_account_exist") {
                        toast.info(t("err_already_account_exist"))
                    }
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
                <H1>{t('auth_signup_title')}</H1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Inputs>
                        <Controller
                            name="name" 
                            control={control}
                            rules={{required: t('auth_input_text_required')}}
                            render={({field}) => <TextField {...field} label={t('auth_input_text')} ref={null} message={errors.name} error={errors.name} type="text" autoComplete="name" />}
                        />
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: t('auth_input_email_required'),
                                pattern: {
                                    value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i,
                                    message: t('auth_input_email_pattern')
                                }
                            }}
                            render={({field}) => <TextField {...field} label={t('auth_input_email')} ref={null} message={errors.email} error={errors.email} type="text" autoComplete="email"/>}
                        />
                        <Controller
                            name="password" 
                            control={control}
                            rules={{required: t('auth_input_password_required'), minLength: {
                                value: 8,
                                message: t('auth_input_password_pattern')
                              }}}
                            render={({field}) => <TextField {...field} label={t('auth_input_password')} ref={null} message={errors.password} error={errors.password} type="password" autoComplete="new-password" />}
                        />
                        <Controller
                            name="passwordRetry" 
                            control={control}
                            rules={{required: t('auth_input_password_retry_required'), validate: (value) =>  value === watch('password') || t('auth_input_password_retry_validate') }}
                            render={({field}) => <TextField {...field} label={t('auth_input_password_retry')} ref={null} message={errors.passwordRetry} error={errors.passwordRetry} type="password" autoComplete="new-password" />}
                        />
                        <Controller
                            name="privacy" 
                            control={control}
                            rules={{required: t('auth_input_privacy_required')}}
                            render={({field}) => <Checkbox {...field} label={<><Link to={t('auth_input_privacy_link')}>{t("auth_input_privacy")}</Link></>} ref={null} error={errors.privacy}/>}
                        />
                        <Controller
                            name="marking" 
                            control={control}
                            render={({field}) => <Checkbox {...field} label={<>{t('auth_input_marking')} <Link to={t('auth_input_marking_link')}>{t('auth_input_marking_2')}</Link></>} ref={null} error={errors.marking}/>}
                        />

                    </Inputs>

                    <LoginMenu>
                        <Left>
                            <A to="/login">{t('auth_login')}</A>
                        </Left>
                        <Right>
                            <Button color='teal' type="submit" isLoading={isLoading} label={t("auth_signup")} />
                        </Right>
                    </LoginMenu>
                </form>
            </Divver>
        </>
    )
}