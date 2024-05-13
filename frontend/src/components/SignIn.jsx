import { Card, TextField , Button, Typography} from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SignIn(){
    const navigate = useNavigate()
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
                onClick={()=>{
                    fetch('http://localhost:3000/admin/login' , {
                        method : "POST",
                        body : JSON.stringify({
                            username : username,
                            password : password,

                        }),
                        headers : {
                            "Content-Type" : "application/json"
                        }
                    })
                    .then(res => res.json())
                    .then(res =>{
                        if(res.success){
                            localStorage.setItem('token' , res.token1)
                            // navigate('/addcourse')
                            window.location= "/addcourse"
                        }
                    })
                }}
            >SignIn
            </Button>

        </Card>
    </div>
    
}

export default SignIn