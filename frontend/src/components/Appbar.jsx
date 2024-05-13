import { Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


function Appbar(){
    const navigate = useNavigate()

    const [auth , setAuth] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(()=>{
        fetch('http://localhost:3000/admin/me',{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer "+localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.auth){
                console.log(res.user , res.success)
                setAuth(res.auth)
                setUser(res.user.username)
                console.log(user, auth)
            }
        })
    },[auth, user])

    if(auth == true){
        return <div
        style={{
          display : "flex",
          justifyContent : "space-between",
          padding : "10px"
        }}
        >
             <Typography
             variant={"h5"}
             >
            Course App
            </Typography>
      
            
      
            <div
            style={{
              display : "flex",
              justifyContent : "space-between",
            }}
            >
            <Typography
             variant={"p"}
             >
            {user}
            </Typography>
            {/* <div>{user}</div> */}
            <Button
            variant="contained"
            onClick={()=>{
              localStorage.setItem('token', null)
              navigate('/signin')
              setAuth(false)
              setUser(null)
            }}
            >Logout
            </Button>  
            </div> 
         </div>
    }

    
    return <div
  style={{
    display : "flex",
    justifyContent : "space-between",
    padding : "10px"
  }}
  >
       <Typography
       variant={"h5"}
       >
      Course App
      </Typography>

      

      <div
      style={{
        display : "flex",
        justifyContent : "space-between",
        width : "180px"
      }}
      >
      <Button
      variant="contained"
      onClick={()=>{
        navigate('/signin')
    }}
      >SignIn
      </Button>

      <Button
      variant="contained"
      onClick={()=>{
        navigate('/signup')
      }}
      >SignUp
      </Button>  
      </div> 
   </div>
}

export default Appbar