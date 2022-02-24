import { useContext, useEffect } from "react"
import { UserContext } from "../context/user"

export default function Redirect(props) {
    const { user, SetUser } = useContext(UserContext)

    console.log(user)

    useEffect(() => {
        localStorage.removeItem('token')
        SetUser({})
        window.location.href = '/'
    }, [SetUser])

    return (
        <></>
    )
}