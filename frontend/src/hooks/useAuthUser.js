import axios from "axios"
import { useState } from "react"

export const useAuthUser = () => {
    const [auth , setAuth] = useState(false)
    const [user, setUser] = useState(null)

    const fetchMe = async() => {
    const {data} = await axios.get('http://localhost:3000/admin/me',{
        headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer "+localStorage.getItem('token')
        }
    })

    if (data.auth) {
        setAuth(data.auth)
        setUser(data.user.username)
    }
    }

    return {
        fetchMe,
        auth,
        user,
        setAuth,
        setUser
    }
}