import axios from "axios"
import { useEffect, useState } from "react"


const useCreateToken=(user)=>{
    const [token,setToken]=useState("")

    useEffect(()=>{
        if(user){
            //console.log( 'fromtoken',user.user.email)
            const email = user?.user?.email
            const url = `https://bl-operation-server-8udwslvjt-mdatislam.vercel.app/user`
            const createToken= async()=>{
                const {data}= await axios.post(url,email)
                const token= data.accessToken 
                localStorage.setItem('accessToken',token)
                setToken(token)
            }
            createToken()
            
        }
        

    },[user])
    return [token]
}

export default useCreateToken;