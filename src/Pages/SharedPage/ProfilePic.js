import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "./Loading";
import useAxiosSecure from "../Hook/useAxiosSecure";

const ProfilePic = () => {
  const [user] = useAuthState(auth);
 const [axiosSecure]=useAxiosSecure()
  
 const { isLoading, data: users = [] } = useQuery({
  queryKey: ['users',user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/userList/users?email=${user.email}`)
    return res.data
  }
})
  

  if (isLoading) {
    return <Loading />;
  }
  //console.log(users);

  return (
    <div className="py-2 flex flex-col  justify-center items-center bg-slate-400 px-4 rounded-lg">
      {user && (
        <div className="avatar">
          <figure className="w-32">
            {users?.map((p) => (
              <img
                src={p.url}
                key={p.email}
                className="rounded-lg"
                alt="Profile Pic download problem"
              />
            ))}
          </figure>
        </div>
      )}
      <h2 className="font-bold">{user?.displayName}</h2>
    </div>
  );
};

export default ProfilePic;
