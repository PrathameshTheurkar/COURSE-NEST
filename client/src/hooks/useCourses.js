import axios from "axios"
import { useState } from "react"

const useCourses = () => {
    const [courses, setCourses] = useState([])

    const fetchCourses = async() => {
        const {data} = await axios.get('http://localhost:3000/users/courses', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        if(data.success){
            setCourses(data.courses)
        }
    }

    return{
        courses,
        fetchCourses
    }
}

export default useCourses
