import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import  {useSetRecoilState}  from "recoil"
import CourseCard from "../components/CourseCard.jsx"
import UpdateCourse from "../components/UpdateCourse.jsx"
import  courseState from "../recoil/atom/courseAtom.js"
import axios from 'axios'



function Course(){
    let {courseId} = useParams()

    // const [course , setCourse] = useState({})

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
    
    useEffect(()=>{
        fetchCourse()
    },[])


    if(!success){
        if(msg == "Invalid courseId"){
            return <div>
                Invalid courseId
            </div>
        }
        return <div>
            Loading......
        </div>
    }

    return <div
    style={{
        display : "flex",
        alignItems : "center",
        flexDirection : "column"
    }}
    >
        <CourseCard/>
        <UpdateCourse courseId={courseId} />
    </div>

}

export default Course
