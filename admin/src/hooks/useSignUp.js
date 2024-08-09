import axios from "axios"
import { useNavigate } from "react-router-dom"

export const useSignUp = () => {
    const navigate = useNavigate()

    const handleSignUp = async(event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const {data} = await axios.post('http://localhost:3000/admin/signup', {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            username: formData.get('email'),
            password: formData.get('password')
        }) 

        if(data.success){
            localStorage.setItem('token', data.token)
            navigate('/courses')
        }
    }   

    return {
        handleSignUp
    }
}
