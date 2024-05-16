import { useEffect, useState } from "react"
import CourseCard from "./CourseCard"

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
        return <CourseCard course={course}/>
    })}
    
    </div>
}

export default Courses