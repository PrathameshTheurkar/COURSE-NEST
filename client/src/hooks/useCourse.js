import axios from "axios"
import { useParams } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import courseState from "../recoil/atom/courseAtom"

export const useCourse = () => {
    const {courseId} = useParams()
    const setCourse = useSetRecoilState(courseState)

    const fetchCourse = async() => {
        const {data} = await axios.get(`http://localhost:3000/users/course/${courseId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        if(data.success){
            setCourse(data.course)
        }
    }

    return{
        fetchCourse
    }
}
