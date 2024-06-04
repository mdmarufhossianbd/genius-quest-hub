import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCreator from "../../Hooks/useCreator";

const ContestView = () => {
    const contest = useLoaderData();
    const [creator, refetch] = useCreator();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    // contest publish
    const handleContestPublish = contest => {
        axiosSecure.patch(`/contests/${contest._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('This contest is publish successfully');
                    
                }
            })
       refetch()
    }

    const { creatorEmail, creatorName, contestName, contestImage, contestDescription, contestRegistrationFee, contestPrize, contestInstructions, contestContestType, contestPublishDate, contestDeadline, contestParticipateCount, contestStatus } = contest;
    return (
        <div>
            <div className="flex justify-between">

                <button onClick={() => navigate(-1)} className="btn btn-sm mb-5">Back</button>

                {creator ? "" : <div>
                    {
                        contestStatus == "pending" ? <button onClick={() => handleContestPublish(contest)} className="btn btn-sm mb-5 bg-[#407BFF] text-white hover:text-black">Confirm Publish</button> : contestStatus
                    }
                </div>}

            </div>
            <img className="w-full h-[400px] object-cover py-8" src={contestImage} />
            <div className="flex">
                <div className="w-full">
                    <h2>{contestName}</h2>
                    <p><span className="font-semibold">Description : </span>{contestDescription}</p>
                    <p><span className="font-semibold">Instructions : </span>{contestInstructions}</p>
                </div>
                <div className="bg-cyan-200 w-1/3 border-2 p-4">
                    <h4><span className="font-semibold">Contest Prize</span> ${contestPrize}</h4>
                    <h4><span className="font-semibold">Registration Fee :</span> {contestRegistrationFee !== 0 ? "$" : ""} {contestRegistrationFee !== 0 ? contestRegistrationFee : "Free"}</h4>
                    <p><span>Deadline</span> {contestDeadline}</p>
                    <p><span>Publish Date</span> {contestPublishDate}</p>
                    <h4><span className="font-semibold">Creator Name : </span>{creatorName}</h4>
                    <h4><span className="font-semibold">Creator Email :</span> {creatorEmail}</h4>
                    <h4><span className="font-semibold">Contest Type : </span>{contestContestType}</h4>
                    <h4><span className="font-semibold">Contest Status : </span>{contestStatus}</h4>
                    <h4><span className="font-semibold">Contest Participate : </span>{contestParticipateCount}</h4>
                </div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </div>
        </div>
    );
};

export default ContestView;