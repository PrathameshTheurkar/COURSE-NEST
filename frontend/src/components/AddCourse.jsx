import { Button, Card, TextField, Typography } from "@mui/material"
import { useState } from "react"

function AddCourse(){
    const [title , setTitle] = useState("")
    const [description, setDescription] = useState("")
    
    return <div
    style={{
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        flexDirection : "column"
    }}
    >
        <Typography
            variant={"h6"}
            >
                Add the Course
            </Typography>

        <Card
        variant="outlined"
        style={{
            width : "400px",
            padding : "20px"
        }}
        >
            <TextField
            variant="outlined"
            fullWidth = {true}
            onChange={(e)=>{
                setTitle(e.target.value)
            }}
            label = "Title"
            >
            </TextField>
            <br /> <br />            
            <TextField
            variant="outlined"
            fullWidth = {true}
            onChange={(e)=>{
                setDescription(e.target.value)
            }}
            label = "Description"
            >
            </TextField>
            
            <br /><br />

            <Button
            variant="contained"
            size = "large"
            onClick={()=>{
                fetch('http://localhost:3000/admin/courses' , {
                        method : "POST",
                        body : JSON.stringify({
                            title : title,
                            description: description,

                        }),
                        headers : {
                            "Content-Type" : "application/json",
                            "Authorization" : "Bearer "+localStorage.getItem('token')
                        }
                    })
                    // .then(res => res.json())
                    // .then(res =>{
                    //     if(res.success){
                    //         localStorage.setItem('token' , res.token1)
                    //         // navigate('/addcourse')
                    //         window.location= "/addcourse"
                    //     }
                    // })
            }}
            >Add</Button>
        </Card>
    </div>
}

export default AddCourse