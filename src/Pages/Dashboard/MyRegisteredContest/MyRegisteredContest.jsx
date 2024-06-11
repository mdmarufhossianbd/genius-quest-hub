import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import MyRegisteredCard from "./MyRegisteredCard";

const MyRegisteredContest = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();

    const { data: registeredContest = [], isPending} = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async() => { 
            const res = await axiosSecure.get(`/registered-contest?email=${user.email}`);            
            return res.data;
        }
    })

    if(isPending){
        return <div className="flex justify-center items-center min-h-screen">
                    <span className=" loading loading-dots loading-lg"></span>
                </div>
    }
    
    return (
        <div>
            <h2 className="text-3xl text-center mb-5">My Total Registered contest {registeredContest.length}</h2>
            <div className="grid grid-cols-2 gap-5">
                {
                    registeredContest.map(contest => <MyRegisteredCard key={contest._id} contest={contest}></MyRegisteredCard>)
                }
            </div>
        </div>
    );
};

export default MyRegisteredContest;