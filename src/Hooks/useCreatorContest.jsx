import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const useCreatorContest = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic();
    const {data : myContests = [], isLoading, refetch}= useQuery({
        queryKey: [user.email, 'myContests'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/contests/my-contests/${user.email}`);
            return res.data;
        }
    })
    return [myContests, isLoading, refetch]
};

export default useCreatorContest;