/* eslint-disable no-unused-vars */
import styled from "styled-components"
import { Link } from "react-router-dom"
import OpizeLogoImg from '../../assets/opize.png'
import OpizeLogoTextImg from '../../assets/opize_text_1.png'
import { useForm, Controller } from "react-hook-form";

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
    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data) => {
        console.log(data)
    };

    return (
        <>
            <Divver>
                <Logos to='/'>
                    <Logo src={OpizeLogoImg}/>
                    <LogoText src={OpizeLogoTextImg} />
                </Logos>
                <H1>Opize에 로그인합니다</H1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Inputs>
                        <Controller
                            name="email"
                            control={control}
                            rules={{required: "이메일을 입력해주세요."}}
                            render={({field}) => <LoginInput {...field} name="이메일" ref={null} error={errors.email} type="text" autoComplete="email"/>}
                        />
                        <Controller
                            name="password" 
                            control={control}
                            rules={{required:"비밀번호를 입력해주세요."}}
                            render={({field}) => <LoginInput {...field} name="비밀번호" ref={null} error={errors.password} type="password" autoComplete="current-password" />}
                        />
                    </Inputs>

                    <LoginMenu>
                        <Left>
                            <A to="/sign-up">회원가입</A> | <A to="/reset-password">비밀번호 재설정</A>
                        </Left>
                        <Right>
                            <ColorBtnSubmit type="submit" value="로그인" />
                        </Right>
                    </LoginMenu>
                </form>
            </Divver>
        </>
    )
}