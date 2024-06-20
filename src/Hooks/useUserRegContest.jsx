import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUserRegContest = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();

    const { data: userRegContest = [], isLoading} = useQuery({
        queryKey: ['userRegContest', user?.email],
        queryFn: async() => { 
            const res = await axiosSecure.get(`/registered-contest?email=${user.email}`);            
            return res.data;
        }
    });

    return [userRegContest, isLoading]
};

export default useUserRegContest;