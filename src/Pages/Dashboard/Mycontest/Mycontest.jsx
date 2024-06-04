import { Link } from "react-router-dom";
import useCreatorContest from "../../../Hooks/useCreatorContest";

const Mycontest = () => {
    const [myContests] = useCreatorContest();

    return (
        <div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr className="bg-[#407BFF] text-white font-semibold text-lg">
                        <th></th>
                        <th>Name</th>
                        <th>Creator</th>
                        <th>Contest Status</th>                        
                        <th>View</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {/* body */}
                <tbody>
                    {
                        myContests.map((contest, index) => <tr className="hover" key={contest._id}>
                            <th>{index + 1}</th>
                            <td>{contest.contestName}</td>
                            <td>{contest?.creatorName}</td>
                            <td>
                                {contest.contestStatus}
                            </td>
                            <td>
                                <Link to={`/dashboard/contest-preview/${contest._id}`}><button>View</button></Link> 
                            </td>                            
                            <td><button>Delete</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Mycontest;