import { useState } from "react";
import { useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = (user) => {
  const [axiosSecure]=useAxiosSecure()
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  useEffect(() => {
        const email = user?.email;
    if (email) {
      axiosSecure.get(`/user/admin/${email}`)
      /* fetch(`https://backend.bloperation.com/user/admin/${email}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json()) */
        .then((res) => {
          setAdmin(res.data.admin);
          setAdminLoading(false);
        });
    }
  }, [user]);

  return [admin, adminLoading];
};

export default useAdmin;
