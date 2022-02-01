import styled from "styled-components"
import { Link, useNavigate, useSearchParams  } from "react-router-dom"
import jwt_decode from 'jwt-decode'
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { UserContext } from "../../context/user"

import { ColorBtn } from '../../components/btns/btns';
import opizeImg from '../../assets/opize_logoText.png'
import { toast } from "react-toastify"

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
    const { getUser } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [ searchParams ] = useSearchParams()

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
                toast.info('이메일을 재발송했어요.')
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

    // 토큰 인증
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }
        getUser()
    }, [getUser, navigate])

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
                    navigate("/dashboard")
                } catch (err) {
                    if (err.response) {
                        if (err.response.data.code === "invalid_token") {
                            toast.warn("토큰이 올바르지 않아요.")
                        } else if (err.response.data.code === "user_not_found") {
                            toast.warn("존재하지 않는 이메일이에요.")
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
    }, [searchParams, navigate])

    return (
        <Divver>
            <Link to="/">
                <Logo src={opizeImg} />
            </Link>
            <H1>이메일 인증을 완료하세요!</H1>
            <Desc>{email} 으로 발송된 메일에서 인증 링크를 클릭하세요.</Desc>
            <ColorBtn text="인증메일 재발송" isLoading={isLoading} onClick={emailRetry} />
        </Divver>
    )
}