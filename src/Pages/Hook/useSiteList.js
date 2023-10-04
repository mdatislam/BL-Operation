import { useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useSiteList = () => {
  const [axiosSecure]=useAxiosSecure()
  const [siteList, setSiteList] = useState([]);
  

  axiosSecure.get("/siteInfo")
  .then(res=> setSiteList(res.data))
  
  return [siteList];
};
export default useSiteList;
