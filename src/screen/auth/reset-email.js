import styled from "styled-components"
import { Link, useSearchParams  } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify"

import opizeImg from '../../assets/opize_logoText.png'

import { ColorBtn, H1 } from 'opize-components'


const Divver = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
`

const Logo = styled.img`
    height: 20px;
`

const Desc = styled.div`
    color: #747474;
    font-size: 14px;
    margin-bottom: 20px;
`

export default function EmailVerify(props) {
    const [ searchParams ] = useSearchParams()
    const [isLoading, setLoading] = useState(false)
    const { t } = useTranslation('translation')

    useEffect(() => {
        document.title = `${t("auth_reset_email_page_title")} - Opize`
    }, [t])

    const emailRetry = async () => {
        try {
            setLoading(true)
            await axios.post(`${process.env.REACT_APP_API_SERVER}/auth/reset-password-request`, {
                email: searchParams.get("email"),
            });
            setLoading(false)
            toast.info(t('auth_email_resend'))
        } catch (err) {
            setLoading(false)
            if (err.response) {
                if (err.response.data.code === "user_not_found") {
                    toast.info(t('err_email_not_exist'))
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

    return (
        <Divver>
            <Link to="/">
                <Logo src={opizeImg} />
            </Link>
            <H1>{t('auth_reset_email_title')}</H1>
            <Desc>{t('auth_reset_email_subtitle', {email: searchParams.get("email")})}</Desc>
            <ColorBtn label={t('auth_reset_btn_text')} isLoading={isLoading} onClick={emailRetry} />
        </Divver>
    )
}