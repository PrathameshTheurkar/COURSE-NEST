import { useState } from "react"
import axios from 'axios'

export const useCourses = () => {
    const [courses, setCourses] = useState([])

    const fetchCourses = async() => {
        const {data} = await axios.get('http://localhost:3000/admin/courses', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ localStorage.getItem('token')
            }
        })
    
        setCourses(data)
    }

    return {
        courses,
        setCourses,
        fetchCourses
    }

}