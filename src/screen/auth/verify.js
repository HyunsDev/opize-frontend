import styled from "styled-components"
import { Link, useNavigate, useSearchParams  } from "react-router-dom"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { UserContext } from "../../context/user"
import { useTranslation } from 'react-i18next';

import opizeImg from '../../assets/opize_logoText.png'
import { toast } from "react-toastify"

import { Button } from 'opize-components'
import instance from "../../src/instance"

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

const H1 = styled.h1`
    font-size: 32px;
`

const Desc = styled.div`
    color: #747474;
    font-size: 14px;
    margin-bottom: 20px;
`

export default function EmailVerify(props) {
    const { updateUser, user } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [ searchParams ] = useSearchParams()
    const { t } = useTranslation('translation')

    useEffect(() => {
        document.title = `${t("auth_verify_page_title")} - Opize`
    }, [t])

    const emailRetry = async () => {
        try {
            setLoading(true)
            const res = await axios.post(`${process.env.REACT_APP_API_SERVER}/auth/email-retry`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setLoading(false)
            if (res.data.code === "email_send") {
                toast.info(t("auth_email_resend"))
            } else if (res.data.code === "already_verified") {
                navigate('/')
            }
        } catch (err) {
            setLoading(false)
            if (err.response) {
                if (err.response.data.code === "user_not_found") {
                    navigate("/login")
                } else if (err.response.data.code === "token_expired") {
                    navigate("/login")
                } else if (err.response.data.code === "invalid_token") {
                    navigate("/login")
                } else {
                    console.error(err)
                    toast.error(err.message)
                }
            } else {
                console.error(err)
                toast.error(err.message)
            }
        }
    }

    useEffect(() => {
        setEmail(searchParams.get("email"))
    }, [searchParams])

    // 토큰 인증
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }
        if (user.isVerified) {
            toast.info('이메일을 인증했어요!')
            navigate("/dashboard")
        }
    }, [updateUser, navigate, user])

    // 새로고침 인증
    useEffect(() => {
        (async () => {
            try {
                await instance.get('/user');
                toast.info('이메일을 인증했어요!')
                navigate('/dashboard')
            } catch (err) { }
        })()
    }, [navigate])

    // 이메일 인증
    useEffect(() => {
        const email = searchParams.get("email")
        const code = searchParams.get("code")
        if (email && code) {
            (async () => {
                try {
                    await axios.post(`${process.env.REACT_APP_API_SERVER}/auth/verify`, {
                        email,
                        code
                    })
                    toast.info('이메일을 인증했어요!')
                    navigate("/dashboard")
                } catch (err) {
                    if (err.response) {
                        if (err.response.data.code === "invalid_token") {
                            toast.warn(t("err_invalid_token"))
                        } else if (err.response.data.code === "user_not_found") {
                            toast.warn(t("err_email_not_exist"))
                        } else {
                            toast.error(err.message)
                            console.error(err)
                        }
                    } else {
                        toast.error(err.message)
                        console.error(err)
                    }
                }
            })()
        }
    }, [searchParams, navigate, t])

    return (
        <Divver>
            <Link to="/">
                <Logo src={opizeImg} />
            </Link>
            <H1>{t('auth_verify_title')}</H1>
            <Desc>{t("auth_verify_subtitle", {email: email || '이메일'})}.</Desc>
            {/* <Button color='teal' label={t('auth_verify_btn_text')} isLoading={isLoading} onClick={emailRetry} /> */}
        </Divver>
    )
}