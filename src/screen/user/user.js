import { useContext, useState, useEffect } from 'react';
import { UserContext } from "../../context/user";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import instance from '../../src/instance';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";

import { HorizonLayout, TextField, Button, Checkbox } from 'opize-components'

const HorizonLayouts = styled.div`
    display: flex;
    gap: 30px;
    margin-top: 32px;
    width: 100%;
    flex-direction: column;
`

const ProfileImg = styled.img`
    width: 96px;
    height: 96px;
    border-radius: 48px;
    margin-right: 16px;
`

const MenuProfile = (props) => {
    const { user, updateUser } = useContext(UserContext)
    const { t } = useTranslation('translation')
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [ value, setValue ] = useState(user.profileImage)

    useEffect(() => {
        setValue(user.profileImage)
    }, [user])

    const fetchAPI = async () => {
        try {
            if (value === "") return
            setLoading(true)
            await instance.patch(`/user/image`,{
                image: value
            })
            setLoading(false)
            updateUser()
            setValue(user.profileImage)
        } catch (err) {
            setLoading(false)
            if (err.response) {
                if (err.response.data.code === "user_not_found") {
                    toast.error(t('err_user_not_found'))
                } else if (err.response.data.code === "token_expired") {
                    navigate("/login")
                } else if (err.response.data.code === "invalid_token") {
                    toast.error(t('err_invalid_token'))
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

    return (
        <HorizonLayout label={t('user_user_menu_profile')}>
            <ProfileImg src={user.profileImage} alt="profile Img" />
            <TextField placeholder={t('user_user_menu_profile')} value={value || ""} onChange={e => setValue(e.target.value)}/>
            <Button color='teal' isLoading={isLoading} label={t('btn_edit')} onClick={fetchAPI} />
        </HorizonLayout>
    )
}

const MenuName = (props) => {
    const { user, updateUser } = useContext(UserContext)
    const { t } = useTranslation('translation')
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [ value, setValue ] = useState(user.name)

    useEffect(() => {
        setValue(user.name)
    }, [user])

    const fetchAPI = async () => {
        try {
            if (value === "") return
            if (value === user.name) return
            setLoading(true)
            await instance.patch(`/user/name`,{
                name: value
            })
            setLoading(false)
            updateUser()
            toast.info(t('user_user_menu_name_toast'))
            setValue(user.name)
        } catch (err) {
            setLoading(false)
            if (err.response) {
                if (err.response.data.code === "user_not_found") {
                    toast.error(t('err_user_not_found'))
                } else if (err.response.data.code === "token_expired") {
                    navigate("/login")
                } else if (err.response.data.code === "invalid_token") {
                    toast.error(t('err_invalid_token'))
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

    return (
        <HorizonLayout label={t('user_user_menu_name')}>
            <TextField placeholder={user.name} value={value || ""} onChange={e => setValue(e.target.value)}/>
            <Button color="teal" isLoading={isLoading} label={t('btn_edit')} onClick={fetchAPI} />
        </HorizonLayout>
    )
}

const MenuEmail = (props) => {
    const { user } = useContext(UserContext)
    const { t } = useTranslation('translation')
    const [ value, setValue ] = useState(user.email)

    useEffect(() => {
        setValue(user.email)
    }, [user])

    return (
        <HorizonLayout label={t('user_user_menu_email')}>
            <TextField placeholder={t('user_user_menu_email')} value={value || ""} onChange={e => setValue(e.target.value)} readOnly/>
        </HorizonLayout>
    )
}

const Form = styled.form`
    width: 100%;
`

const Inputs = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const Btns = styled.div`
    margin-top: 20px;
    width: fit-content;
    float: right;
`

const MenuPassword = (props) => {
    const { updateUser } = useContext(UserContext)
    const { t } = useTranslation('translation')
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)

    const { control, reset, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            newPasswordRetry: "",
        }
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            await instance.patch(`/user/password`,{
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            })
            toast.info(t('user_user_menu_password_toast'))
            reset({
                currentPassword: "",
                newPassword: "",
                newPasswordRetry: "",
            })
            setLoading(false)
            updateUser()
        } catch (err) {
            setLoading(false)
            if (err.response) {
                if (err.response.data.code === "user_not_found") {
                    toast.error(t('err_user_not_found'))
                } else if (err.response.data.code === "token_expired") {
                    navigate("/login")
                } else if (err.response.data.code === "invalid_token") {
                    toast.error(t('err_invalid_token'))
                } else if (err.response.data.code === "wrong_password") {
                    toast.error(t('err_wrong_password'))
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

    return (
        <HorizonLayout label={t('user_user_menu_password')}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Inputs>
                    <Controller
                        name="currentPassword" 
                        control={control}
                        rules={{required: t('auth_input_password_required'), minLength: {
                            value: 8,
                            message: t('auth_input_password_pattern')
                            }}}
                        render={({field}) => <TextField {...field} label={t('user_user_menu_password_current_password')} ref={null} error={errors.currentPassword} message={errors.currentPassword} type="password" autoComplete="current-password" />}
                    />
                    <Controller
                        name="newPassword" 
                        control={control}
                        rules={{required: t('auth_input_password_required'), minLength: {
                            value: 8,
                            message: t('auth_input_password_pattern')
                            }}}
                        render={({field}) => <TextField {...field} label={t('user_user_menu_password_new_password')} ref={null} error={errors.newPassword} message={errors.newPassword} type="password" autoComplete="new-password" />}
                    />
                    <Controller
                        name="newPasswordRetry" 
                        control={control}
                        rules={{required: t('auth_input_password_retry_required'), validate: (value) =>  value === watch('newPassword') || t('auth_input_password_retry_validate') }}
                        render={({field}) => <TextField {...field} label={t('user_user_menu_password_new_password_retry')} ref={null} error={errors.newPasswordRetry} message={errors.newPasswordRetry} type="password" autoComplete="new-password" />}
                    />
                </Inputs>
                <Btns>
                    <Button color="teal" type='submit' isLoading={isLoading} text={t('btn_edit')} />
                </Btns>
            </Form>
        </HorizonLayout>
    )
}

const MenuCoupon = (props) => {
    // const { updateUser } = useContext(UserContext)
    const { t } = useTranslation('translation')
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [ value, setValue ] = useState("")

    const fetchAPI = async () => {
        try {
            if (value === "") return
            toast.info(t('developingFunction'))
            return

            // setLoading(true)
            // await axios.patch(`${process.env.REACT_APP_API_SERVER}/user/coupon`,{
            //     name: value
            // }, {
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem('token')}`
            //     }
            // })
            // setLoading(false)
            // updateUser()
            // setValue()
        } catch (err) {
            setLoading(false)
            if (err.response) {
                if (err.response.data.code === "user_not_found") {
                    toast.error(t('err_user_not_found'))
                } else if (err.response.data.code === "token_expired") {
                    navigate("/login")
                } else if (err.response.data.code === "invalid_token") {
                    toast.error(t('err_invalid_token'))
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

    return (
        <HorizonLayout label={t('user_user_menu_coupon')}>
            <TextField value={value || ""} onChange={e => setValue(e.target.value)} placeholder={t('user_user_menu_coupon_placeholder')}/>
            <Button color="teal" isLoading={isLoading} label={t('btn_use')} onClick={fetchAPI} />
        </HorizonLayout>
    )
}

const MenuMarking = (props) => {
    const { user, updateUser } = useContext(UserContext)
    const { t } = useTranslation('translation')
    const navigate = useNavigate()
    const [ value, setValue ] = useState(user.isMarketingAccept || false)

    useEffect(() => {
        setValue(user.isMarketingAccept)
    }, [user])

    const onChange = async () => {
        try {
            setValue(!value)
            await instance.patch(`/user/marketing-accept`,{
                accept: !value
            })
            updateUser()
        } catch (err) {
            if (err.response) {
                if (err.response.data.code === "user_not_found") {
                    toast.error(t('err_user_not_found'))
                } else if (err.response.data.code === "token_expired") {
                    navigate("/login")
                } else if (err.response.data.code === "invalid_token") {
                    toast.error(t('err_invalid_token'))
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


    return (
        <HorizonLayout label={t('user_user_menu_marking')}>
            <Checkbox value={value || false} onChange={onChange} label={<>{t('user_user_menu_marking_label')} <Link to={t('auth_input_marking_link')}>{t('user_user_menu_marking_label_2')}</Link></>} />
        </HorizonLayout>
    )
}

const MenuDestroy = (props) => {
    // const { user, updateUser } = useContext(UserContext)
    const { t } = useTranslation('translation')
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)

    const fetchAPI = async () => {
        try {
            const check = global.confirm(t('user_user_menu_destroy_conform'))
            if (!check) return
            setLoading(true)
            await instance.delete(`${process.env.REACT_APP_API_SERVER}/user`)
            localStorage.removeItem('token')
            navigate('/')
        } catch (err) {
            setLoading(false)
            if (err.response) {
                if (err.response.data.code === "user_not_found") {
                    toast.error(t('err_user_not_found'))
                } else if (err.response.data.code === "token_expired") {
                    navigate("/login")
                } else if (err.response.data.code === "invalid_token") {
                    toast.error(t('err_invalid_token'))
                } else if (err.response.data.code === 'roles_user_cant_withdrawn') {
                    toast.error('권한을 가진 유저는 탈퇴할 수 없습니다. 관리자에게 문의하세요.')
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

    return (
        <HorizonLayout label={t('user_user_menu_destroy')}>
            <Button isLoading={isLoading} label={t('user_user_menu_destroy')} onClick={fetchAPI} color='error' />
        </HorizonLayout>
    )
}

function Roles(props) {
    const { user } = useContext(UserContext)
    const { t } = useTranslation('translation')

    return (
        <HorizonLayout label={t('user_user_menu_roles')}>
            <TextField value={user.roles || ''} readOnly/>
        </HorizonLayout>
    )
}

export default function User(props) {
    const { user } = useContext(UserContext)

    return (
        <>
            <HorizonLayouts>
                <MenuProfile />
                <MenuName />
                <MenuEmail />
                <MenuPassword />
                <MenuCoupon />
                {user?.roles?.length !== 0 && <Roles />}
                <MenuMarking />
                <MenuDestroy />
            </HorizonLayouts>
        </>
    )
}