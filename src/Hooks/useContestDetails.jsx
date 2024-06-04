import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useContestDetails = () => {
    const axiosPublic = useAxiosPublic();
    // const [contests] = useContest()
    // console.log(contests);
    const {data : contest, isLoading} = useQuery({
        queryKey: ['contest'],
        queryFn: async () =>{
            const res = await axiosPublic.get(`/contests/${contests._id}`)
            console.log(res.data);
            return res.data
        }
    })
    return [contest, isLoading]
};

export default useContestDetails;