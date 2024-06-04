import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const useCreatorContest = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic();
    const {data : myContests = [], isLoading}= useQuery({
        queryKey: [user.email, 'myContests'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/contests/my-contests/${user.email}`);
            console.log(res.data);
            return res.data;
        }
    })
    return [myContests, isLoading]
};

export default useCreatorContest;