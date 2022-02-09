import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER,
});
instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

export default instance