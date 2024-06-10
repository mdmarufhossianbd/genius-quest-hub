import useContest from "../../Hooks/useContest";
import ContestCart from "./ContestCart";

const Contest = () => {
    const [contests, isLoading] = useContest();
    const publishContest = contests.filter(item => item.contestStatus == 'Publish')
    if(isLoading){
        return <div className="flex justify-center items-center min-h-screen">
        <span className=" loading loading-dots loading-lg"></span>
    </div>
    }
    return (
        <div className="max-w-7xl mx-auto py-20">
           <h2>All Contest</h2>           
           <div className="grid md:grid-cols-2 gap-5">
            {
                publishContest.map(contest => <ContestCart key={contest._id} contest={contest} ></ContestCart> )
            }
           </div>
        </div>
    );
};

export default Contest;