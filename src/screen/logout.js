import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/user"

export default function Redirect(props) {
    const navigate = useNavigate()
    const { user, SetUser } = useContext(UserContext)

    console.log(user)

    useEffect(() => {
        localStorage.removeItem('token')
        SetUser({})
        navigate('/')
    }, [navigate, SetUser])

    return (
        <></>
    )
}