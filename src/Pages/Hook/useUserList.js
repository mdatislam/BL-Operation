
import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useUserList = () => {
  const [axiosSecure]=useAxiosSecure()
  const [userList, setUserList] = useState([]);
  
useEffect(()=>{
  const userData= async()=>{
    const {data}= await axiosSecure.get("/userList")
    const userInfo= data
    //console.log(userInfo)
    setUserList(userInfo)
  }
  userData() 
  
},[])
  return [userList]
    
};
export default useUserList;
