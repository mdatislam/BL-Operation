
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const usePgList = () => {
  const [axiosSecure]=useAxiosSecure()
  const [PgList, setPgList] = useState([]);
   useEffect(() => {

    const pgData= async()=>{
      const {data}= await axiosSecure.get("/PgList")
      const pgInfo= data
      //console.log(userInfo)
      setPgList(pgInfo)
    }
    pgData() 
    
  },[]);

  return [PgList];
};
export default usePgList;
