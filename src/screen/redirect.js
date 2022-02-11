import axios from "axios"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function Redirect(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const { t } = useTranslation('translation')

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/redirect${location.pathname.replace('r/', '')}`)
                window.location.href = res.data.originalUrl;
            } catch (err) {
                if (err.response) {
                    if (err.response.data.code === 'redirect_not_found') {
                        toast.warn(t('err_redirect_not_found'));
                        navigate('/')
                    } else {
                        console.error(err)
                        toast.error(err.message)
                    }
                } else {
                    console.error(err)
                    toast.error(err.message)
                }
            }
        })()

    }, [location, navigate, t])

    return (
        <></>
    )
}