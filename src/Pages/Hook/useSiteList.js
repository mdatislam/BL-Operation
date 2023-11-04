import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";


const useSiteList = () => {
  const [axiosSecure]=useAxiosSecure()
  const [siteList, setSiteList] = useState([]);


   
  useEffect(()=>{

    const siteData= async()=>{
      const {data}= await axiosSecure.get("/siteInfo")
      const pgInfo= data
      //console.log(userInfo)
      setSiteList(pgInfo)
    }
    siteData() 
    
  },[axiosSecure])
  
  
  return [siteList];
};
export default useSiteList;
