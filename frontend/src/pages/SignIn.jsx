import { Card, TextField , Button, Typography} from "@mui/material"
import axios from "axios"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast'
// import { useNavigate } from "react-router-dom"

function SignIn(){
    // const navigate = useNavigate()
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")

    return <div
    style={{
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        flexDirection : "column",
        position : "relative",
        marginTop : "130px",
    }}
    >

        {username}
        {password}
        <Typography
        variant="h6"
        style={{
            marginBottom : "10px"
        }}
        >
        Welcome to SignIn Page    
        </Typography>
        <Card
        variant="outlined"
        style = {{
        width : "400px",
        padding : "20px",

        }}
        >
            <TextField 
            onChange={(e)=>{
                setUsername(e.target.value)
            }}            
            label={"Email"}
            variant={"outlined"}
            fullWidth = {true}
            ></TextField>
            <br /><br />

            <TextField 
            onChange={(e)=>{
                setPassword(e.target.value)
            }}            
            label={"Password"}
            variant={"outlined"}
            fullWidth = {true}
            type = {"password"}
            ></TextField>

            <br /><br />
            <Button
                variant="contained"
                size="large"
                onClick={async()=>{

                    const {data} = await axios.post('http://localhost:3000/admin/login',{
                        username,
                        password
                    })
                    if (data.success){
                        localStorage.setItem('token', data.token1)
                        // window.location = '/courses'
                    }
                    toast.success(data.message)
                }}
            >SignIn
            </Button>

        </Card>
        <Toaster position='top-right'/>
    </div>
    
}

export default SignIn