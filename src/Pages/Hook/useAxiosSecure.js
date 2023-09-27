import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import auth from "../../firebase.init"
import { signOut } from "firebase/auth"




const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
})

const useAxiosSecure = () => {
    const navigate = useNavigate()

    useEffect(() => {
        // Add a request interceptor
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('accessToken')
            if (token) {
                config.headers.authorization = ` Bearer ${token}`
            }
            return config;
        },);

        // Add a response interceptor
        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                    navigate("/Login");

                }
                return Promise.reject(error);
            });
        return [axiosSecure]
    }, [navigate])
   

}
export default useAxiosSecure