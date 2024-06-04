import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useCreator = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data : creator = [], isPending : usersLoading} = useQuery({
        queryKey: [user?.email, 'isCreator'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/creators/${user?.email}`)
            console.log(res.data);
            return res.data
        }
    })
    return [creator, usersLoading]
};

export default useCreator;