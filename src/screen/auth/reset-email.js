import styled from "styled-components"
import { Link, useSearchParams  } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

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
    const [ searchParams ] = useSearchParams()
    const [isLoading, setLoading] = useState(false)

    const emailRetry = async () => {
        try {
            setLoading(true)
            await axios.post(`${process.env.REACT_APP_API_SERVER}/auth/reset-password-request`, {
                email: searchParams.get("email"),
                test: "true"
            });
            setLoading(false)
            toast.info("이메일을 재발송했어요.")
        } catch (err) {
            setLoading(false)
            if (err.response) {
                if (err.response.data.code === "user_not_found") {
                    toast.info("존재하지 않는 이메일이에요.")
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
            <H1>이메일을 확인해주세요.</H1>
            <Desc>{searchParams.get("email")} 으로 발송된 메일에서 초기화 링크를 클릭하세요.</Desc>
            <ColorBtn text="초기화 메일 재발송" isLoading={isLoading} onClick={emailRetry} />
        </Divver>
    )
}