import { useEffect } from "react"
import { useCourses } from "../hooks/useCourses"
import {Link} from 'react-router-dom'
import { Card, CardActionArea, CardContent, Divider, Typography } from "@mui/material"

const Courses = () => {
  const {courses, fetchCourses} = useCourses()

  useEffect(()=>{
    fetchCourses()
  }, [courses])

    return <div
      style={{
        // height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}
    >
      {courses.map(course => {
        return <>
       <Link to={`/course/${course._id}`}>
       <Card variant="outlined" sx={{ width: 300, height: 300, margin: 3, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
      <CardActionArea>
        <img style={{width: 300, height: 180}} src={course.imageLink} alt={course.title + ' image'}/> 
      </CardActionArea>
      <Divider  />
      <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course.description}
          </Typography>
        </CardContent>
    </Card>
       </Link>
        </>
      })}

    </div>
}

export default Courses