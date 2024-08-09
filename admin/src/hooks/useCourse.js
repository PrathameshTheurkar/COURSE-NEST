import { useState } from "react"
import  {useSetRecoilState}  from "recoil"
import courseState from "../recoil/atom/courseAtom"
import axios from 'axios'
import { useParams } from "react-router-dom"

export const useCourse = () => {
    let {courseId} = useParams()

    const setCourse = useSetRecoilState(courseState)
    const [success , setSuccess] = useState(false)
    const [msg, setMsg] = useState('')

    const fetchCourse = async () => {
        const {data} = await axios.get('http://localhost:3000/admin/course/' + courseId, {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem('token')
            }
        })
        if (data.success){
            setCourse(data.course)
            setSuccess(true)
        }
        setMsg(data.message)
    }
    return {
        fetchCourse,
        success,
        msg
    }
}
