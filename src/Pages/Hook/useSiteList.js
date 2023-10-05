import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useSiteList = () => {
  const [axiosSecure]=useAxiosSecure()
  const [siteList, setSiteList] = useState([]);
  
  useEffect(()=>{
    axiosSecure.get("/siteInfo")
    .then(res=> {
      const siteData= res.data
      //console.log(siteData)
      setSiteList(siteData)
    })
  },[])
  
  
  return [siteList];
};
export default useSiteList;
