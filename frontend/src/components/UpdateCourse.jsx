/* eslint-disable react/prop-types */
import { Button, Card, TextField} from "@mui/material"
import { useState } from "react"
import { useSetRecoilState } from "recoil"
import courseState  from "../recoil/atom/courseAtom.js"

// import { useParams } from "react-router-dom"

function UpdateCourse({courseId}){

    const setCourse = useSetRecoilState(courseState)
    const [title , setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")

    return <Card
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

        <TextField
        variant="outlined"
        fullWidth = {true}
        onChange={(e)=>{
            setImage(e.target.value)
        }}
        label = "Image Link"
        >
        </TextField>

        <br /><br />
        <Button
        variant="contained"
        size = "large"
        onClick={()=>{
            fetch('http://localhost:3000/admin/course/' + courseId , {
                    method : "PUT",
                    body : JSON.stringify({
                        title : title,
                        description: description,
                        price : 100,
                        imageLink : image,
                        published : true

                    }),
                    headers : {
                        "Content-Type" : "application/json",
                        "Authorization" : "Bearer "+localStorage.getItem('token')
                    }
                })
                .then(res => res.json())
                .then(res =>{
                    if(res.success){
                        setCourse({
                            title : title,
                            description : description,
                            imageLink : image
                        })
                    }
                })
        }}
        >Update</Button>
    </Card>

}

export default UpdateCourse
