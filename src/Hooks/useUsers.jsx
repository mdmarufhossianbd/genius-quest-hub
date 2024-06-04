import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data : users, isLoading : userLoading} = useQuery({
        queryKey: [user?.email, 'users'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data
        }
    })
    return [users, userLoading]
};

export default useUsers;