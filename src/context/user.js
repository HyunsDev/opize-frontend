import { createContext, useState } from 'react'
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"

export const UserContext =  createContext({
})

const UserContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const { t } = useTranslation()

    const [user, SetUser] = useState({});
    const updateUser = async () => {
        const token = localStorage.getItem('token')
        try {
            if (!token) {
                navigate('/login')
                return
            }
            const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.setItem('token', res.data.token)
            delete res.data.token
            SetUser(res.data)
        } catch (err) {
            if (err.response) {
                if (err.response.data.code === "user_not_found") {
                    navigate("/login")
                } else if (err.response.data.code === "token_expired") {
                    navigate("/login")
                } else if (err.response.data.code === "invalid_token") {
                    navigate("/login")
                } else if (err.response.data.code === "need_email_verified") {
                    navigate("/verify")
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

    const initUser = async () => {
        if (user.name) {
            return
        }
        const token = localStorage.getItem('token')
        try {
            if (!token) {
                navigate('/login')
                return
            }
            const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            delete res.data.token
            SetUser(res.data)
            console.log(res.data);
        } catch (err) {
            if (err.response) {
                if (err.response.data.code === "user_not_found") {
                    navigate("/login")
                } else if (err.response.data.code === "token_expired") {
                    navigate("/login")
                } else if (err.response.data.code === "invalid_token") {
                    navigate("/login")
                } else if (err.response.data.code === "need_email_verified") {
                    navigate("/verify")
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

    const getUser = async (token = localStorage.getItem('token')) => {
        try {
            if (!token) {
                return 'need_token'
            }
            const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            SetUser(res.data)
            return 'user_successful'
        } catch (err) {
            if (err.response) {
                if (err.response.data.code === "user_not_found") {
                    return 'user_not_found'
                } else if (err.response.data.code === "token_expired") {
                    return 'token_expired'
                } else if (err.response.data.code === "invalid_token") {
                    return 'invalid_token'
                } else if (err.response.data.code === "need_email_verified") {
                    return 'need_email_verified'
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

    const instanceHandling = ( err ) => {
        if (err.response) {
            if (err.response.data.code === "user_not_found") {
                toast.error(t('err_user_not_found'))
                err.processed = true
                throw err
            } else if (err.response.data.code === "token_expired") {
                navigate("/login")
                err.processed = true
                throw err
            } else if (err.response.data.code === "invalid_token") {
                toast.error(t('err_invalid_token'))
                navigate("/login")
                err.processed = true
                throw err
            } else {
                // console.error(err)
                // toast.error(err.message)
                throw err
            }
        } else {
            // console.error(err)
            // toast.error(err.message)
            throw err
        }
    }

    return (
        <UserContext.Provider value={{ user, updateUser, getUser, initUser, instanceHandling }}>
            {children}
        </UserContext.Provider>);
    };

export default UserContextProvider;