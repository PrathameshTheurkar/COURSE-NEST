import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import courseState from "../recoil/atom/courseAtom"
import { useRecoilValue }  from "recoil"

export default function CourseCard() {
  const course = useRecoilValue(courseState)

  if (!course) {
    return <div>No course data available...</div>;
}

  return (
    <Card variant="outlined" sx={{ padding: 2, width: 300, height: 'auto', margin: 3, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius: 3}}>
      <CardActionArea>
        <img style={{width: '100%', height: 180}} src={course.imageLink} alt={course.title + ' image'}/> 
      </CardActionArea>
      {/* <Divider  /> */}
      <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course.description}
          </Typography>
        </CardContent>
    </Card>
  );
}
