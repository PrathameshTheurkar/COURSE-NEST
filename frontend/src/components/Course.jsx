import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CourseCard from "./CourseCard"
import UpdateCourse from "./UpdateCourse"

function Course(){
    let {courseId} = useParams()

    const [course , setCourse] = useState({})
    const [success , setSuccess] = useState(false)
    const [msg, setMsg] = useState('')

    useEffect(()=>{
        fetch('http://localhost:3000/admin/course/' + courseId, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.success){
                setCourse(res.course)
                setSuccess(true)
            }
            setMsg(res.message)
        })
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
        <CourseCard course={course}/>
        <UpdateCourse courseId={courseId} setCourse={setCourse}/>
    </div>

}

export default Course
