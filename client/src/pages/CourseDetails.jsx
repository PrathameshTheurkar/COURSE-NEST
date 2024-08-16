import { Box, Typography } from "@mui/material"
import CourseCard from "../components/CourseCard"
import { useCourse } from "../hooks/useCourse"
import { useEffect } from "react"
import { useRecoilValue } from "recoil"
import courseState from "../recoil/atom/courseAtom"

const CourseDetails = () => {
    const {fetchCourse} = useCourse()
    const course = useRecoilValue(courseState)

    useEffect(()=> {
        fetchCourse()
    }, [])

    return<div style={{margin: '-30px'}}>
        <Box component='div' sx={{backgroundColor: '#2196f3', width: '100%', paddingLeft: {xs: 10, sm: 15}, paddingTop: {xs: 3, sm: 10}, paddingBottom: {xs: 3, sm: 10},  }}>
            <Typography variant="h3" color={'#fff'} sx={{width: {xs: '100%', sm: '50%'}}}>{course.title}</Typography>
        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: {xs: 'column', sm: 'row'}
        }}>
            
            <Box sx={{position: {sm: 'absolute'}, top: {sm: 100}, right: {sm: 20}}}>
            <CourseCard /> 
            </Box>
            <Box component='div' sx={{height: 'auto', width: '400px'}}>
               {course.description}
            </Box>
        </Box>
    </div>
}

export default CourseDetails