import { Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from 'axios'


function Appbar(){
    const navigate = useNavigate()

    const [auth , setAuth] = useState(false)
    const [user, setUser] = useState(null)

    const fetchMe = async() => {
       const {data} = await axios.get('http://localhost:3000/admin/me',{
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer "+localStorage.getItem('token')
        }
       })

       if (data.auth) {
        setAuth(data.auth)
        setUser(data.user.username)
       }
    }

    useEffect(()=>{
        fetchMe()
    },[auth, user])

    if(auth == true){
        return <div
        style={{
          display : "flex",
          justifyContent : "space-between",
          padding : "10px",
          paddingRight : "30px",
          marginBottom : 50,
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
              gap : 20,
            }}
            >
            <NavLink
            to='/courses'
            style={({isActive})=>{
              return isActive ? {color : '#1976d2', textDecoration : 'none'} : {color : 'black',  textDecoration : 'none'}
            }}
            >
            <Typography
            variant="h6"
            //  color = {"#1976d2"}
            // color = {'black'}
             style={{
              display : 'flex',
              justifyContent : 'center',
              alignItems : 'center',
              marginRight : 10
             }}
            >
              Courses
            </Typography>
            </NavLink>

            <NavLink
            to = '/addcourse'
            style={({isActive})=>{
              return isActive ? {color : '#1976d2', textDecoration : 'none'} : {color : 'black',  textDecoration : 'none'}
            }}
            >
            <Typography
            variant="h6"
            //  color = {"#1976d2"}
            // color = {'black'}
             style={{
              display : 'flex',
              justifyContent : 'center',
              alignItems : 'center',
              marginRight : 10,
             }}
            >
              Add Course
            </Typography>
            </NavLink>
            </div>
      
            <div
            style={{
              display : "flex",
              justifyContent : "space-between",
            }}
            >
            <Typography
             variant={"subtitle1"}
             style={{
              display : "flex",
              justifyContent : "center",
              alignItems : "center",
              marginRight : 10
             }}
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
    padding : "10px",
    paddingRight : "30px"
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