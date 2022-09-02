import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER,
})

export const authInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER,
    headers: {
        Authorization: `Bearer ${typeof window !== 'undefined' && localStorage.getItem('token')}`,
    },
})