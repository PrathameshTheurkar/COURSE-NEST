import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import courseState from "../recoil/atom/courseAtom"
import { useRecoilValue }  from "recoil"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

export default function CourseCard() {
  const course = useRecoilValue(courseState)

  if (!course) {
    return <div>No course data available</div>;
}

  return (
    <Card variant="outlined" sx={{ padding: 2, backgroundColor: '#fff', width: 400, height: 500, margin: 3, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius: 3 }}>
      <CardActionArea sx={{width: 365}}>
        <img style={{ width: '100%', height: 230}} src={course.imageLink}/> 
      </CardActionArea>
      <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {course.title}
          </Typography>

          <Typography gutterBottom variant="body2" component="div" sx={{mb: 3}}>
            {course.description}
          </Typography>
          <Typography variant='subtitle2' sx={{color: 'grey'}}>
            PRICE
          </Typography>
          <Typography variant='h6' sx={{width: 'auto', display: 'flex', alignItems: 'center', mb: 4}}>
            <CurrencyRupeeIcon fontSize='small'/>{course.price}
          </Typography>

          <Button variant='contained' sx={{width: '100%', borderRadius: 5, p: 1}}>BUY NOW</Button>
        </CardContent>
    </Card>
  );
}
