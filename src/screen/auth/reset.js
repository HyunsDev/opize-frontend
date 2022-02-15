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

import { ColorBtnSubmit } from "../../components/btns/btns";
import LoginInput from '../../components/inputs/loginInput'

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
    margin-top: 8px;
    font-size: 24px;
    margin-bottom: 40px;
    color: var(--grey9);
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
    const [ searchParams ] = useSearchParams()
    const [isLoading, setLoading] = useState(false)
    const { t } = useTranslation('translation')

    useEffect(() => {
        document.title = `${t("auth_reset_page_title")} | Opize`
    }, [t])

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: searchParams.get('email') || '',
            password: ""
        }
    });

    const onSubmit = async (data) => {
        if (!isLoading) {
            try {
                setLoading(true)
                const res = await axios.post(`${process.env.REACT_APP_API_SERVER}/auth/reset-password-request`, {
                    email: data.email,
                });
                console.log(res.data)
                setLoading(false)
                navigate(`/reset-password/email?email=${data.email}`)
            } catch (err) {
                setLoading(false)
                if (err.response) {
                    if (err.response.data.code === "user_not_found") {
                        toast.info(t("err_email_not_exist"))
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
                            name="email"
                            control={control}
                            rules={{required: t('auth_input_email_required'),
                            pattern: {
                                value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i,
                                message: t('auth_input_email_pattern')
                            }}}
                            render={({field}) => <LoginInput {...field} name={t('auth_input_email')} ref={null} error={errors.email} type="text" autoComplete="email"/>}
                        />
                    </Inputs>

                    <LoginMenu>
                        <Left>
                            <A to="/login">{t('auth_login')}</A>
                        </Left>
                        <Right>
                            <ColorBtnSubmit text={t('auth_reset')} isLoading={isLoading} />
                        </Right>
                    </LoginMenu>
                </form>
            </Divver>
        </>
    )
}