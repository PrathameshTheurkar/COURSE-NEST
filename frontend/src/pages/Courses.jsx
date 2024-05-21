import { useEffect, useState } from "react"
// import CourseCard from "./CourseCard"
import { Card, Typography } from "@mui/material"

function Courses(){
    const [courses , setCourses] = useState([])
    
    useEffect(()=>{
        fetch('http://localhost:3000/admin/courses' , {
                        method : "GET",
                        headers : {
                            "Content-Type" : "application/json",
                            "Authorization" : "Bearer "+ localStorage.getItem('token')
                        }
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            setCourses(res)
        })
        
    },[])
    return <div 
    style ={{
        display : "flex",
        flexWrap : "wrap",
        justifyContent : "center"
    }}
    >
    
    {courses.map(course =>{
        // eslint-disable-next-line react/jsx-key
        return <Card
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
    })}
    
    </div>
}

export default Courses