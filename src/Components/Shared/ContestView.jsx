import { Link, useLoaderData } from "react-router-dom";

const ContestView = () => {
    const contest = useLoaderData();

    const { creatorEmail, creatorName, contestName, contestImage, contestDescription, contestRegistrationFee, contestPrize, contestInstructions, contestContestType, contestPublishDate, contestDeadline, contestParticipateCount, contestStatus } = contest;
    return (
        <div>
            <div className="flex justify-between">
                <Link to={'/dashboard/my-contest'}><button  className="btn btn-sm mb-5">Back</button></Link>
                {
                    contestStatus == "pending" ? <button className="btn btn-sm mb-5">Confirm Publish</button> : contestStatus
                }
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
                    <h4><span className="font-semibold">Registration Fee</span> ${contestRegistrationFee == 0 ? "Free" : contestRegistrationFee}</h4>
                    <p><span>Deadline</span> {contestDeadline}</p>
                    <p><span>Publish Date</span> {contestPublishDate}</p>
                    <h4><span className="font-semibold">Creator Name : </span>{creatorName}</h4>
                    <h4><span className="font-semibold">Creator Email :</span> {creatorEmail}</h4>
                    <h4><span className="font-semibold">Contest Type : </span>{contestContestType}</h4>
                    <h4><span className="font-semibold">Contest Status : </span>{contestStatus}</h4>
                    <h4><span className="font-semibold">Contest Participate : </span>{contestParticipateCount}</h4>
                </div>
            </div>
        </div>
    );
};

export default ContestView;