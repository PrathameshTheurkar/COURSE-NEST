import {useParams} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const useDeleteCourse = () => {
    let {courseId} = useParams()
    const navigate = useNavigate()

    const deleteCourse = async() => {
        const {data} = await axios.delete('http://localhost:3000/admin/course/' + courseId, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        if(data.success){
            navigate('/courses')
        }
    }

    return {
        deleteCourse,
    }


}