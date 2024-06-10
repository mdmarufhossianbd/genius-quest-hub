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
            const res = await axiosSecure.get(`/registered-contest/?email=${user.email}`);
            return res.data;
        }
    })

    if (isPending) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className=" loading loading-dots loading-lg"></span>
        </div>
    }

    console.log(regContests);

    return (
        <div>
            This is registered contest page for creator. {regContests.length}
            <div className="grid grid-cols-2 gap-5">
                {
                    regContests.map(regContest => <ContestCard key={regContest._id} regContest={regContest}></ContestCard>)
                }
            </div>
        </div>
    );
};

export default RegisteredContest;