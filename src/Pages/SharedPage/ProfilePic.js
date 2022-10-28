import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
//import useUserList from "../Hook/useUserList";
import Loading from "./Loading";

const ProfilePic = () => {
  const [user] = useAuthState(auth);
  //const [userList] = useUserList();

  const navigate = useNavigate();
  const { data: users, isLoading } = useQuery(["List", user], () =>
    fetch(
      `https://enigmatic-eyrie-94440.herokuapp.com/userList/users?email=${user.email}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401 || res.status === 403) {
        toast.error("Unauthorize access");

        localStorage.removeItem("accessToken");
        navigate("/Login");
      }
      return res.json();
    })
  );

  if (isLoading) {
    return <Loading />;
  }
  //console.log(users);

  return (
    <div className="py-2 flex flex-col  justify-center items-center bg-slate-400">
      {user && (
        <div className="avatar">
          <div className="w-24 rounded-xl">
            {users?.map((p) => (
              <img src={p.url} alt="Profile Pic" />
            ))}
          </div>
        </div>
      )}
      <h2 className="font-bold">{user.displayName}</h2>
    </div>
  );
};

export default ProfilePic;
