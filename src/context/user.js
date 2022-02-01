import { createContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"

export const UserContext =  createContext({
})

const UserContextProvider = ({ children }) => {
    const navigate = useNavigate()

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
            SetUser(res.data)
        } catch (err) {
            if (err.response) {
                console.log(err.response.data.code)
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
            SetUser(res.data)
        } catch (err) {
            if (err.response) {
                console.log(err.response.data.code)
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

    return (
        <UserContext.Provider value={{ user, updateUser, getUser, initUser }}>
            {children}
        </UserContext.Provider>);
    };

export default UserContextProvider;