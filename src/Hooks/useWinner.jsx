import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useWinner = () => {
    const axiosSecure = useAxiosSecure();
    const {data : winnerContest = [], isLoading, refetch} = useQuery({
        queryKey: ['winnerContest'],
        queryFn: async () => {
            const res = await axiosSecure.get('/winners');
            return res.data
        }
    })
    return [winnerContest, isLoading, refetch]
};

export default useWinner;