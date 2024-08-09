// import axios from 'axios'
// import { useEffect, useState } from 'react'
import {Navigate, Outlet} from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const PrivateRoutes = () => {
  // const [auth, setAuth] = useState(false)  
  // useEffect(()=>{
  //   const handleAuth = async() => {
  //       const {data} = await axios.get('http://localhost:3000/admin/me', {
  //           headers: {
  //               "Content-Type" : "application/json",
  //               "Authorization" : "Bearer "+localStorage.getItem('token')
  //           }
  //       }) 
  //       if(data.auth == true)setAuth(data.auth)
  //       else setAuth(false)
        
  //   }
  //   handleAuth()
  //   }, [])

  const auth = true

    return(
      auth ? <Outlet /> : <Navigate to='/login'/>
    )
}

export default PrivateRoutes