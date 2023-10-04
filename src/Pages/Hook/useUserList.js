
import { useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useUserList = () => {
  const [axiosSecure]=useAxiosSecure()
  const [userList, setUserList] = useState([]);
  

  axiosSecure.get("/userList")
  .then(res=> setUserList(res.data))
    return [userList];
};
export default useUserList;
