
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useContestSummery = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { data: bookingContest = [], refetch } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async() => { 
            const res = await axiosSecure.get(`/contest-summery?email=${user.email}`);            
            return res.data;
        }
    })

    return [bookingContest, refetch];
};

export default useContestSummery;