import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUsers = () => {
    const {user, loading} = useAuth();
    console.log(user?.email);
    const axiosSecure = useAxiosSecure();
    const {data : users, isLoading : userLoading} = useQuery({
        queryKey: [user?.email, 'users'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)           
            console.log(res.data)
            return res.data
        }
    })
    return [users, userLoading]
};

export default useUsers;