import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAllUser = () => {

    const axiosSecure = useAxiosSecure();
    const {data : allUser, isLoading} = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })

    return [allUser, isLoading];
};

export default useAllUser;