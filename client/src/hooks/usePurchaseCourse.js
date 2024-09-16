import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

export const usePurchaseCourse = () => {
  const {courseId} = useParams()

  const handlePurchaseCourse = async() => {
    
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
    
    }

    return{
      handlePurchaseCourse      
    }

}



