import { useEffect, useState } from "react"
// import CourseCard from "./CourseCard"
import { Card, Typography } from "@mui/material"
import axios from 'axios'

function Courses(){
    const [courses , setCourses] = useState([])

    const fetchCourses = async()=>{
        const {data} = await axios.get('http://localhost:3000/admin/courses',{
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer "+ localStorage.getItem('token')    
        }
        })
        setCourses(data)
    }
    
    useEffect(()=>{
        fetchCourses()
        
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