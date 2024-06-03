import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUsers = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data : creator, isPending : usersLoading} = useQuery({
        queryKey: [user?.email, 'users'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/creators/${user?.email}`)           
            return res.data
        }
    })
    return [creator, usersLoading]
};

export default useUsers;