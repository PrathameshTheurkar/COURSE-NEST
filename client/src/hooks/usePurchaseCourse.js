import axios from "axios"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

export const usePurchaseCourse = () => {
  const {courseId} = useParams()

  const handlePurchaseCourse = async() => {
    // const {data} = await axios.post(`http://localhost:3000/users/courses/${courseId}`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + localStorage.getItem('token')
    // }
    // })
    
    fetch(`http://localhost:3000/users/courses/${courseId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.success){
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    })

    // if(data.success){
    //   toast.success(data.message)
    // }else{
    //   toast.error(data.message)
    // }

    }

    return{
      handlePurchaseCourse      
    }

}



