import axios from 'axios'
import { useNavigate } from "react-router-dom"


export const useLogin = () => {
    const navigate = useNavigate()
    const handleLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const {data} = await axios.post('http://localhost:3000/admin/login', {
            username: formData.get('email'),
            password: formData.get('password')
        })

        if(data.success){
            localStorage.setItem('token', data.token1)
            // window.location = '/dashboard'
            navigate('/courses')
        }
        
    }
    return {
        handleLogin
    }
}
