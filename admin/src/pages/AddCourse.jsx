import { Button, Card, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import toast from 'react-hot-toast'


function AddCourse(){
    const [title , setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imageLink, setImageLink] = useState("")
    
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
            padding : "20px",
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
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

            <TextField
            variant="outlined"
            fullWidth = {true}
            onChange={(e)=>{
                setImageLink(e.target.value)
            }}
            label = "Image Link"
            >
            </TextField>

            <br /><br />
            <Button
            variant="contained"
            size = "large"
            onClick={async()=>{
                
                    const {data} = await axios.post('http://localhost:3000/admin/courses', {
                        title,
                        description,
                        imageLink,
                        published: true
                    },{
                        headers : {
                            "Content-Type" : "application/json",
                            "Authorization" : "Bearer "+localStorage.getItem('token')
                        }
                    })

                    if (data.success){
                        toast.success('Course Added Successfully')
                    }
            }}
            >Add</Button>
        </Card>
    </div>
}

export default AddCourse