import { useLoaderData } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useRegisterContest from "../../../Hooks/useRegisterContest";
import ParticipateCard from "./ParticipateCard";

const MangeContestApplication = () => {
    const contest = useLoaderData();
    const { user } = useAuth();
    const [regContest] = useRegisterContest();

    const regCount = regContest.filter(item => item.creatorEmail === user?.email);
    const { contestId, contestName, userEmail, userName, contestType } = contest;

    const totalReg = regCount.filter(item => item.contestId == contestId);


    return (
        <div className="">
            <div className="mb-10">
                <h2 className="text-2xl">Contest Info</h2>
                <h2>{contestName}</h2>
                <p>Contest Category : {contestType}</p>
                <p>Applicant Name : {userName}</p>
                <p>Applicant Email : {userEmail}</p>
            </div>
            <div>
                <h2 className='text-3xl text-center my-5'>Contest Submition details</h2>
                <div>
                    {
                        totalReg.map(participate => <ParticipateCard key={participate._id} participate={participate} user={user}></ParticipateCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default MangeContestApplication;