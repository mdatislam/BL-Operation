import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useUserList = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const url = `https://enigmatic-eyrie-94440.herokuapp.com/
userList`;
    //console.log(url)
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("accessToken");
          navigate("/Login");
        }
        return res.json();
      })
      .then((data) => setUserList(data));
  });

  return [userList];
};
export default useUserList;
