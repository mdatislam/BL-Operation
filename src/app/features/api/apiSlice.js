import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";
import { Navigate } from "react-router-dom";



const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL_DEV,
        headers: {
            authorization: ` Bearer ${localStorage.getItem('accessToken')}`
        },
        validateStatus: (response) => {
            
            if (response.status === 401 || response.status === 403) {
                // Handle unauthorized or forbidden responses
                signOut(auth);
                localStorage.removeItem("accessToken");
                Navigate("/Login");
                return false; // Reject the promise
            }
            return response.ok; // Default behavior for other status codes
        },
    }),
    endpoints: (builder) => ({})

})

export default apiSlice