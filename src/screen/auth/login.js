/* eslint-disable no-unused-vars */
import styled from "styled-components"
import axios from "axios"
import { Link,  useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";
import { UserContext } from "../../context/user"
import { toast } from "react-toastify"
import { useEffect, useState, useContext } from "react"
import { useTranslation } from 'react-i18next';

import OpizeLogoImg from '../../assets/opize.png'
import OpizeLogoTextImg from '../../assets/opize_text_1.png'

import { ColorBtn, FormInput } from 'opize-components'

const H1 = styled.h1`
    font-size: 24px;
    font-weight: 800;
    margin: 12px 0px;;
`

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
    const navigate = useNavigate()
    const { updateUser } = useContext(UserContext)
    const [isLoading, setLogin] = useState(false)
    const { t } = useTranslation('translation')

    useEffect(() => {
        document.title = `${t("auth_login_page_title")} - Opize`
    }, [t])

    const { control, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data) => {
        if (!isLoading) {
            try {
                setLogin(true)
                const res = await axios.post(`${process.env.REACT_APP_API_SERVER}/auth/sign-in`, {
                    email: data.email,
                    password: data.password,
                });
                setLogin(false)
                localStorage.setItem("token", res.data.token)
                window.location.href='/dashboard'
            } catch (err) {
                setLogin(false)
                if (err.response) {
                    if (err.response.data.code === "user_not_found") {
                        toast.info(t('err_email_not_exist'))
                    } else if (err.response.data.code === "wrong_password") {
                        toast.info(t('err_wrong_password'))
                    } else {
                        console.error(err)
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

                <H1>{t('auth_login_title')}</H1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Inputs>
                        <Controller
                            name="email"
                            control={control}
                            rules={{required: t('auth_input_email_required'),
                            pattern: {
                                value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i,
                                message: t('auth_input_email_pattern')
                            }}}
                            render={({field}) => <FormInput {...field} label="이메일" ref={null} error={errors.email} type="text" autoComplete="email"/>}
                        />
                        <Controller
                            name="password" 
                            control={control}
                            rules={{required: t('auth_input_password_required')}}
                            render={({field}) => <FormInput {...field} label={t('auth_input_password')} ref={null} error={errors.password} type="password" autoComplete="current-password" />}
                        />
                    </Inputs>

                    <LoginMenu>
                        <Left>
                            <A to={`/signup?email=${watch('email')}`}>{t('auth_signup')}</A> | <A to={`/reset-password?email=${watch('email')}`}>{t('auth_reset')}</A>
                        </Left>
                        <Right>
                            <ColorBtn label={t('auth_login')} isLoading={isLoading} type="submit" />
                        </Right>
                    </LoginMenu>
                </form>
            </Divver>
        </>
    )
}