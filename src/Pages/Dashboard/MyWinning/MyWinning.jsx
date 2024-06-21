import useAuth from "../../../Hooks/useAuth";
import useWinner from "../../../Hooks/useWinner";
import MyWinningCard from "./MyWinningCard";

const MyWinning = () => {
    const {user} = useAuth();
    const [winnerContest, isLoading] = useWinner();
    const userWinContests = winnerContest.filter( item => item?.applicant?.userEmail === user?.email);
    if(isLoading){
        return <div className="flex justify-center items-center min-h-screen">
            <span className=" loading loading-dots loading-lg"></span>
        </div>
    }
    return (
        <div>
            <h2 className="text-3xl font-semibold text-center py-5 mb-10">My Winning Contests</h2>
           <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mb-10">
                {
                    userWinContests.map( item => <MyWinningCard key={item._id} item={item}></MyWinningCard>)
                }
           </div>
        </div>
    );
};

export default MyWinning;