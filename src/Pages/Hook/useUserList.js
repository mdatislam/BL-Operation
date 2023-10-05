
import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useUserList = () => {
  const [axiosSecure]=useAxiosSecure()
  const [userList, setUserList] = useState([]);
  
useEffect(()=>{
  axiosSecure.get("/userList")
  .then(res=> {
    const userInfo= res.data
    //console.log(userInfo)
    setUserList(userInfo)
  })
},[])
  return [userList]
    
};
export default useUserList;
