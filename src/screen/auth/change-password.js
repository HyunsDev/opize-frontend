/* eslint-disable no-unused-vars */
import styled from "styled-components"
import axios from "axios"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

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
    color: #2d2d2d;
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

    useEffect(() => {
        document.title = "비밀번호 재설정 | Opize"
    }, [])

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
                await axios.post(`${process.env.REACT_APP_API_SERVER}/auth/reset-password?test=true`, {
                    email: searchParams.get('email'),
                    code: searchParams.get('code'),
                    password: data.password,
                });
                setLoading(false)
                toast.info('비밀번호가 변경되었어요. 다시 로그인해주세요.')
                navigate('/login')
            } catch (err) {
                setLoading(false)
                if (err.response) {
                    if (err.response.data.code === "invalid_token") {
                        toast.error('코드가 올바르지 않아요.')
                    } else if (err.response.data.code === "user_not_found") {
                        toast.error('코드가 올바르지 않아요.')
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
                <H1>비밀번호 재설정</H1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Inputs>
                        <Controller
                            name="password" 
                            control={control}
                            rules={{required:"비밀번호를 입력해주세요.", minLength: {
                                value: 8,
                                message: '비밀번호는 8자 이상이어야 합니다.'
                              }}}
                            render={({field}) => <LoginInput {...field} name="변경할 비밀번호" ref={null} error={errors.password} type="password" autoComplete="new-password" />}
                        />
                        <Controller
                            name="passwordRetry" 
                            control={control}
                            rules={{required: "비밀번호를 다시 입력해주세요.", validate: (value) =>  value === watch('password') || "비밀번호가 다릅니다." }}
                            render={({field}) => <LoginInput {...field} name="비밀번호 재입력" ref={null} error={errors.passwordRetry} type="password" autoComplete="new-password" />}
                        />

                    </Inputs>

                    <LoginMenu>
                        <Left>
                            <A to="/login">로그인</A>
                        </Left>
                        <Right>
                            <ColorBtnSubmit isLoading={isLoading} text={"비밀번호 재설정"} />
                        </Right>
                    </LoginMenu>
                </form>
            </Divver>
        </>
    )
}