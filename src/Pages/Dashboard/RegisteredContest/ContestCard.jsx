import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import useAuth from '../../../Hooks/useAuth';
import useRegisterContest from '../../../Hooks/useRegisterContest';

const ContestCard = ({ contest }) => {
    const [regContest] = useRegisterContest();
    const {user} = useAuth();
    const regCount = regContest.filter(item => item.creatorEmail === user?.email);
    const { contestDeadline, contestId, contestImage, contestName, contestPrize, contestPublishDate, contestRegistrationFee, creatorEmail, creatorName, regDate, transactionId, userEmail, userName, contestType, _id } = contest;
    
    const totalReg = regCount.filter(item => item.contestId == contestId);

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
                                contestName.length >= 50 ? contestName.slice(0, 50) + "..." : contestName
                            }
                        </h2>
                        <p><span className='font-semibold'>Deadline : </span>{new Date(contestDeadline).toLocaleDateString()}</p>
                        <p><span className='font-semibold'>Prize : </span>{contestPrize}</p>
                        <p><span className='font-semibold'>Contest Category : </span> {contestType}</p>
                       <p><span className='font-semibold'>Total Registration :</span> {totalReg.length}</p>
                    </div>
                    <Link to={`/dashboard/mange-contest-application/${_id}`}><button className='btn btn-sm w-full bg-[#407BFF] text-white hover:bg-[#2b2b2b]'>Details</button></Link>
                </div>
            </div>
        </div>
    );
};

ContestCard.propTypes = {
    contest: PropTypes.object
}

export default ContestCard;