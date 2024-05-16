/* eslint-disable react/prop-types */
import { Card, Typography } from "@mui/material"

function CourseCard({course}){
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
}

export default CourseCard