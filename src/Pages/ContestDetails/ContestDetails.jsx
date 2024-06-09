import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const ContestDetails = () => {
    const contest = useLoaderData();
    const [resBtnDisabled, setResBtnDisabled] = useState(false);

    const { contestContestType, contestDeadline, contestDescription, contestImage, contestInstructions, contestName, contestParticipateCount, contestPrize, contestPublishDate, contestRegistrationFee, creatorEmail, creatorName, _id } = contest;
    
    // timer for registration expried date.
    const formateDeadline = new Date(contestDeadline);    
    const registrationRemaingTime = Math.floor((formateDeadline - new Date()) / 1000)
    const [timeLeft, setTimeLeft] = useState(registrationRemaingTime);

    useEffect(() => {
        if (timeLeft <= 0) return setResBtnDisabled(true);
        const timerId = setInterval(() => {
            setTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 1, 0));
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const months = Math.floor(seconds / (3600 * 24 * 30.44));
        const days = Math.floor((seconds % (3600 * 24 * 30.44)) / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${months} months ${days} days ${hours} hours ${minutes} minutes ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} seconds`;
    };


    return (
        <div className="max-w-7xl mx-auto">
            <div>
                <img className="w-full h-[500px] object-cover" src={contestImage} />
            </div>
            <div className="flex gap-5">
                <div className="w-2/3">
                    <h2 className="text-3xl font-bold pb-4">{contestName}</h2>
                    <p><span className="font-semibold">Contest Description :</span> {contestDescription}</p>
                    <p><span className="font-semibold">Contest Instruction :</span> {contestInstructions}</p>
                </div>
                <div className="w-1/3 border rounded p-5">
                    <p><span className="font-semibold">Registration Fee :</span> {contestRegistrationFee === 0 ? "Free" : contestRegistrationFee}</p>
                    <p><span className="font-semibold">Prize : </span>{contestPrize}</p>
                    <p><span className="font-semibold">Contest Category : </span>{contestContestType}</p>
                    <p><span className="font-semibold">Apply Deadline : </span>{contestContestType}</p>
                    <p><span className="font-semibold">Total Participate : </span>{contestParticipateCount} </p>
                    <p><span className="font-semibold">Registration Remaining : </span> {timeLeft > 0 ? formatTime(timeLeft) : 'not available'}</p>
                    <Link to={'/payment'}><button disabled={resBtnDisabled} className="btn btn-sm w-full bg-[#407BFF] hover:text-black text-white hover:bg-white ">{resBtnDisabled ? "Registration date expried" : 'Participate'}</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;