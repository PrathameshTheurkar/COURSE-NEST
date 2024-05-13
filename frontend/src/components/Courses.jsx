import { useEffect, useState } from "react"

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
    return <div>
    
    {courses.map(course =>{
        // eslint-disable-next-line react/jsx-key
        return <div>
           {course.title}{course.description} 
        </div>
    })}
    
    </div>
}

export default Courses