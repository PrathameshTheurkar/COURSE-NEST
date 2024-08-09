import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Divider } from '@mui/material';
import courseState from "../recoil/atom/courseAtom"
import { useRecoilValue }  from "recoil"

// eslint-disable-next-line react/prop-types
export default function CourseCard() {
  const course = useRecoilValue(courseState)

  if (!course) {
    return <div>No course data available</div>;
}

  return (
    <Card variant="outlined" sx={{ width: 300, height: 300, margin: 3, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          image={imageLink}
          alt={title + ' image'}
        />
        */}
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
  );
}
