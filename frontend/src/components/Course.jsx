import { Card, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function Course(){
    let {courseId} = useParams()

    const [course , setCourse] = useState({})
    const [success , setSuccess] = useState(false)

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
        })
    },[])


    if(!success){
        return <div>
            Loading......
        </div>
    }

    return <div>
        <Card
            style={{
                margin : 10,
                width : 280,
                minHeight : 200
            }}
        >
           <Typography textAlign="center" variant="h5">{course.title}</Typography>
           <Typography textAlign="center" variant="subtitle1">{course.description}</Typography>
           <img src={course.imageLink} style={{width : 300, height: 200}} alt="imageLink"></img>
        </Card>
    </div>

}

export default Course
