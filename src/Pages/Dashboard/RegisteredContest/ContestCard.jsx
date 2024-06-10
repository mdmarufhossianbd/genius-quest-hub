import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const ContestCard = ({ regContest }) => {

    const { contestDeadline, contestId, contestImage, contestName, contestPrize, contestPublishDate, contestRegistrationFee, creatorEmail, creatorName, regDate, transactionId, userEmail, userName, contestType, _id } = regContest;
    return (
        <div>
            <div className='flex gap-3 bg-[#a0bdfcbe] p-3 rounded-lg'>
                <div className='w-1/2'>
                    <img className='h-52 w-full object-cover rounded' src={contestImage} />
                </div>
                <div className='w-1/2 flex flex-col justify-between'>
                    <div className='text-black'>
                        <h2 className='font-semibold pb-3'>
                            {
                                contestName.length >= 60 ? contestName.slice(0, 60) + "..." : contestName
                            }
                        </h2>
                        <p><span className='font-semibold'>Deadline : </span>{new Date(contestDeadline).toLocaleDateString()}</p>
                        <p><span className='font-semibold'>Prize : </span>{contestPrize}</p>
                        <p><span className='font-semibold'>Contest Category:</span> {contestType}</p>
                       
                    </div>
                    <Link><button className='btn btn-sm w-full bg-[#407BFF] text-white hover:bg-[#2b2b2b]'>Details</button></Link>
                </div>
            </div>
        </div>
    );
};

ContestCard.propTypes  = {
    regContest: PropTypes.object
}

export default ContestCard;