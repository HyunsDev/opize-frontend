/* eslint-disable no-unused-vars */
import styled from "styled-components"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form";
import { UserContext } from "../../context/user"
import { toast } from "react-toastify"
import { useEffect, useState, useContext } from "react"

import OpizeLogoImg from '../../assets/opize.png'
import OpizeLogoTextImg from '../../assets/opize_text_1.png'

import { ColorBtnSubmit } from "../../components/btns/btns";
import LoginInput from '../../components/inputs/loginInput'
import CheckBox from "../../components/inputs/checkbox"


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
    const {user, updateUser} = useContext(UserContext)
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "회원가입 | Opize"
    }, [])

    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
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
                const res = await axios.post(`${process.env.REACT_APP_API_SERVER}/auth/sign-up?test=true`, {
                    email: data.email,
                    password: data.password,
                    name: data.name,
                    isMarketingAccept: data.marking
                });
                setLoading(false)
                localStorage.setItem('token', res.data.token)
                updateUser()
                navigate('/dashboard')
            } catch (err) {
                setLoading(false)
                console.error(err)
                if (err.response) {
                    if (err.response.data.code === "already_account_exist") {
                        toast.info("이미 계정이 존재합니다.")
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
                <H1>Opize에 회원가입합니다.</H1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Inputs>
                        <Controller
                            name="name" 
                            control={control}
                            rules={{required:"이름을 입력해주세요."}}
                            render={({field}) => <LoginInput {...field} name="이름" ref={null} error={errors.name} type="text" autoComplete="name" />}
                        />
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "이메일을 입력해주세요.",
                                pattern: {
                                    value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i,
                                    message: '올바른 이메일 형식으로 입력해주세요.'
                                }
                            }}
                            render={({field}) => <LoginInput {...field} name="이메일" ref={null} error={errors.email} type="text" autoComplete="email"/>}
                        />
                        <Controller
                            name="password" 
                            control={control}
                            rules={{required:"비밀번호를 입력해주세요.", minLength: {
                                value: 8,
                                message: '비밀번호는 8자 이상이어야 합니다.'
                              }}}
                            render={({field}) => <LoginInput {...field} name="비밀번호" ref={null} error={errors.password} type="password" autoComplete="new-password" />}
                        />
                        <Controller
                            name="passwordRetry" 
                            control={control}
                            rules={{required: "비밀번호를 다시 입력해주세요.", validate: (value) =>  value === watch('password') || "비밀번호가 다릅니다." }}
                            render={({field}) => <LoginInput {...field} name="비밀번호 재입력" ref={null} error={errors.passwordRetry} type="password" autoComplete="new-password" />}
                        />
                        <Controller
                            name="privacy" 
                            control={control}
                            rules={{required: "이용약관에 동의해주세요."}}
                            render={({field}) => <CheckBox {...field} text={<><Link to="/privacy">[필수] 개인정보 수집 및 이용동의</Link></>} ref={null} error={errors.privacy}/>}
                        />
                        <Controller
                            name="marking" 
                            control={control}
                            render={({field}) => <CheckBox {...field} text={<>[선택] Opize의 뉴스레터와 새로운 기능 출시 안내를 받아보세요. 언제든 취소할 수 있어요. <Link to="/marking">(광고,마케팅 수신 동의)</Link></>} ref={null} error={errors.marking}/>}
                        />

                    </Inputs>

                    <LoginMenu>
                        <Left>
                            <A to="/login">로그인</A>
                        </Left>
                        <Right>
                            <ColorBtnSubmit isLoading={isLoading} text={"회원가입"} />
                        </Right>
                    </LoginMenu>
                </form>
            </Divver>
        </>
    )
}