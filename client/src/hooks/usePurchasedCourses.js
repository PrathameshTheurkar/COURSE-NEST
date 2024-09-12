import axios from 'axios'
import { useState } from 'react'

const usePurchasedCourses = () => {
    const [purchases, setPurchases] = useState([])

    const fetchPurchases = async () => {
        const {data} =await axios.get('http://localhost:3000/users/purchasedCourses', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        if(data.success){
            setPurchases(data.purchasedCourses)
            console.log(purchases)
        }

    }
 
    return{
        purchases, 
        fetchPurchases
    }
}

export default usePurchasedCourses