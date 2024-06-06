import useContest from "../../Hooks/useContest";
import ContestCart from "./ContestCart";

const Contest = () => {
    const [contests] = useContest();
    const publishContest = contests.filter(item => item.contestStatus == 'Publish')

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