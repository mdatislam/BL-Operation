import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useVehicleList = () => {
    const [axiosSecure]=useAxiosSecure()

    const { data: vehicleList,refetch } = useQuery({
        queryKey: ["vehicleList"],
        queryFn: async () => {
            const res = await axiosSecure.get("/vehicle")
            return res.data

        }
    })
    //console.log(vehicleList)
    return [vehicleList,refetch]
    
};

export default useVehicleList;