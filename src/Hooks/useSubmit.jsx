
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useSubmit = () => {
    const axiosSecure = useAxiosSecure();
    const {data : submitContests, isLoading, refetch, isPending} = useQuery({
        queryKey: ['submitContests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/submit-contest');            
            return res.data
        }
    })
    return [submitContests, isLoading, refetch, isPending]
};

export default useSubmit;