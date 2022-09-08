import { useEffect, useState } from "react";

const useToken = (user) => {
  
    const [token, setToken] = useState(" ");
    useEffect(() => {
        if (user) {
          console.log(user);
            const email = user?.user?.email;
            const name = user?.user?.displayName;
            console.log(email)
            const userInfo = { 
              name:name,
            email: email 
        };
          fetch(`http://localhost:5000/user/${email}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then((data) => {
                const accessToken = data.accessToken
                localStorage.setItem("token",accessToken)
                setToken(accessToken)
              console.log(data.accessToken);
            });
        
        }
    },[user])
    

  return [token];
};
export default useToken
