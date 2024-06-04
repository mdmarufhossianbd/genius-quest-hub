import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: admin, isLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {            
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log(res.data?.admin);
            return res.data?.admin;
        }
    })
    return [admin, isLoading]
};

export default useAdmin;