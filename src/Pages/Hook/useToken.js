import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useToken = (user) => {
  const [token, setToken] = useState("");
  const [axiosSecure] = useAxiosSecure()

  useEffect(() => {
    if (user) {

      //console.log(user);
      const email = user?.user?.email;
      const name = user?.user?.displayName;
      //console.log(email)
      const userInfo = {
        name: name,
        email: email,
      };

      const tokenCreate = async () => {
        const { data } = await axiosSecure.put(`/user/${email}`, userInfo)
        const accessToken = data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        setToken(accessToken);

      }
      tokenCreate()

      
    }
  }, [user,axiosSecure]);

  return [token];
};
export default useToken;
