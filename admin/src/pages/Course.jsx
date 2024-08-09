import { useEffect } from "react"
import { useCourse } from "../hooks/useCourse"
import CourseCard from "../components/CourseCard"
import UpdateCourse from "../components/UpdateCourse"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"


const Course = () => {
    const {fetchCourse, success, msg} = useCourse()
    let {courseId} = useParams()
    

    useEffect(()=>{
        fetchCourse()
    }, [])

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

    return <>
    <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: {sm: 'row', xs: 'column'}}}>
    <CourseCard />
    <UpdateCourse courseId={courseId}/>
    </Box>
    </>
}

export default Course