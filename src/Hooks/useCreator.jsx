import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useCreator = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data : creator, isLoading} = useQuery({
        queryKey: [user?.email, 'creator'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/creators/${user?.email}`)
            console.log(res.data?.creator);
            return res.data?.creator
        }
    })
    return [creator, isLoading]
};

export default useCreator;