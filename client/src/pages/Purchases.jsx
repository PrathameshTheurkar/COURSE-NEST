import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import usePurchasedCourses from "../hooks/usePurchasedCourses";

const Purchases = () => {
    const {purchases, fetchPurchases} = usePurchasedCourses()

    useEffect(() => {
        fetchPurchases()        
    }, [])

    return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <Typography variant="h4">Purchases</Typography>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {purchases.map((course) => {
            return <>
            <Card
          variant="outlined"
          sx={{
            padding: 2,
            backgroundColor: "#fff",
            width: 350,
            height: "auto",
            margin: 3,
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Box component={'div'}>
          <CardActionArea sx={{ width: 318 }}>
            <img
              style={{ width: "100%", height: 230 }}
              src={course.imageLink}
            />
          </CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {course.title}
            </Typography>

            <Typography
              gutterBottom
              variant="body2"
              component="div"
              sx={{ mb: 3 }}
            >
              {course.description}
            </Typography>

            
          </CardContent>
          </Box>
          <Button
              variant="contained"
              sx={{ width: "100%", borderRadius: 5, p: 1}}
            >
              View Details
            </Button>
        </Card>
            </>
        })}
      </Box>
    </Box>
  );
};

export default Purchases;
