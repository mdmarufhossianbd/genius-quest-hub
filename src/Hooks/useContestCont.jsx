import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useContestCont = () => {
    const axiosPublic = useAxiosPublic();
    const {data : contestCount = {}, isLoading, refetch} = useQuery({
        queryKey: ['contestCount'],
        queryFn: async () => {
            const res = await axiosPublic.get('/total-contest')
           
            return res.data;
        }
    });

    return [contestCount, isLoading, refetch]
};

export default useContestCont;