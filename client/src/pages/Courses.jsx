import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import useCourses from '../hooks/useCourses';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
    const {courses, fetchCourses} = useCourses()

    useEffect(()=>{
      fetchCourses()
    }, [courses])

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
    {courses.map(course => {
      return <>
      <Link to={`/course/${course._id}`} style={{textDecoration: 'none  '}}>
      <Card variant="outlined" sx={{ padding: 2, backgroundColor: '#fff', width: 300, height: 300, margin: 3, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius: 3 }}>
      <CardActionArea>
        <img style={{ width: '100%', height: 180}} src={course.imageLink}/> 
      </CardActionArea>
      <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {course.title}
          </Typography>

          <Typography gutterBottom variant="body2" component="div" >
            {course.title}
          </Typography>
        </CardContent>
    </Card></Link>
      </>
    })}

    </div>
  );
}

export default Courses