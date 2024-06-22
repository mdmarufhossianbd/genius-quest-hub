import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useContestDetails = () => {
    const axiosPublic = useAxiosPublic();
    const {data : contest, isLoading} = useQuery({
        queryKey: ['contest'],
        queryFn: async () =>{
            const res = await axiosPublic.get(`/contests/${contests._id}`)
            return res.data
        }
    })
    return [contest, isLoading]
};

export default useContestDetails;