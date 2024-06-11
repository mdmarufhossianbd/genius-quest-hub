import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ContestCard from "./ContestCard";

const RegisteredContest = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: regContests = [], isPending } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/registered-contest/creator?email=${user.email}`);
            return res.data;
        }
    })

    const removeDuplacate = contests => {
        const currentItem = new Set();
        return contests.filter(item => {
            if(currentItem.has(item.contestId)){
                return false;
            } else {
                currentItem.add(item.contestId);
                return true
            }
        })
    }
    const withoutDuplacate = removeDuplacate(regContests)

    if (isPending) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className=" loading loading-dots loading-lg"></span>
        </div>
    }

    return (
        <div>
            <h2>Total Registration {regContests?.length}</h2>
            <div className="grid grid-cols-2 gap-5">
                {
                    withoutDuplacate?.map(contest => <ContestCard key={contest._id} contest={contest}></ContestCard>)
                }
            </div>
        </div>
    );
};

export default RegisteredContest;