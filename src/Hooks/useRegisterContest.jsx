import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useRegisterContest = () => {
    const axiosSecure = useAxiosSecure();
    const {data : regContest = [], isLoading, refetch}= useQuery({
        queryKey: ['regContest'],
        queryFn: async () => {
            const res = await axiosSecure.get('/registered-contests');
            return res.data;
        }
    })
    return [regContest, isLoading, refetch]
};
export default useRegisterContest;