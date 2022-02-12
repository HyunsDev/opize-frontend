import { createContext, useState } from 'react'
import axios from 'axios';
import { toast } from "react-toastify"

export const DashboardContext =  createContext({
})

const DashContextProvider = ({ children }) => {
    const [dashboard, setDashboard] = useState({});

    const updateDashboard = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/dashboard`)
            setDashboard(res.data)
        } catch (err) {
            if (err.response) {
                console.error(err.response)
                toast.error(err.message)
            } else {
                console.error(err)
                toast.error(err.message)
            }
        }
    }

    const initDashboard = async () => {
        if ('projects' in dashboard) {
            return
        }
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/dashboard`)
            setDashboard(res.data)
            console.log(res.data);
        } catch (err) {
            if (err.response) {
                console.error(err.response)
                toast.error(err.message)
            } else {
                console.error(err)
                toast.error(err.message)
            }
        }
    }

    return (
        <DashboardContext.Provider value={{ dashboard, updateDashboard, initDashboard }}>
            {children}
        </DashboardContext.Provider>);
    };

export default DashContextProvider;