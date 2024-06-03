import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useContest = () => {
    const axiosPublic = useAxiosPublic();

    const {data : contests = [], isLoading, refetch} = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/contests')
            return res.data;
        }
    });

    return [contests, isLoading, refetch]
};

export default useContest;