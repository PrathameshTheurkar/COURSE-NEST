import axios from "axios"
import { useState } from "react"

export const useAuth = async () => {
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState(null)
    async function handleAuthentication(){
        const {data, status} = await axios.get('http://localhost:3000/admin/me', {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer "+localStorage.getItem('token')
            }
        }) 
        if(data.auth){
            setAuth(data.auth)
            setUser(data.user)
        }
        if(status == 404)setAuth(false)
        
    }
    return {
        user,
        auth,
        handleAuthentication
    }
}
