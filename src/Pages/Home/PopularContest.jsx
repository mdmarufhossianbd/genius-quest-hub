import useContest from "../../Hooks/useContest";
import PopularContestCard from "./PopularContestCard";

const PopularContest = () => {
    const [contests, isLoading] = useContest();

    const participateContest = contests.filter(item => item.contestParticipateCount >= 0)
    console.log(participateContest);
    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className=" loading loading-dots loading-lg"></span>
        </div>
    }
    return (
        <div className="py-10">
            <div className="w-1/2 mx-auto">
                <h2 className="text-5xl font-semibold text-center py-4">Popular Contests</h2>
                <p className="text-center ">
                    Welcome to the Popular Contests section. Our featured contests offer amazing prizes, including cash rewards, exclusive gear, and unique opportunities. Join the fun, showcase your talents, and connect with a vibrant community of like-minded individuals. Dive in and see what’s trending – your next big win could be just a click away!</p>
            </div>
            <div className="grid grid-cols-3 gap-5 py-10">
                {
                   participateContest.map(contest => <PopularContestCard key={contest._id} contest={contest}></PopularContestCard>) 
                }                
            </div>
        </div>
    );
};

export default PopularContest;