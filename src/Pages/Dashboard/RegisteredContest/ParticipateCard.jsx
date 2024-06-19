import PropTypes from 'prop-types';
import useSubmit from "../../../Hooks/useSubmit";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast, { Toaster } from 'react-hot-toast';
import useWinner from '../../../Hooks/useWinner';
const ParticipateCard = ({ participate }) => {
    const axiosSecure = useAxiosSecure();
    const [submitContests] = useSubmit();
    const [winnerContest, refetch] = useWinner();
    const { contestId, contestImage, contestName, contestPrize, contestRegistrationFee, creatorEmail, creatorName, regDate, transactionId, userEmail, userName, contestType } = participate;

    const userSubmitContest = submitContests?.filter(item => item.submitContestId === contestId);
    const winner = winnerContest.find( contest => contest.contestId === contestId);
    const matchedWinner = winner ? winner.contestId === contestId : null
    const handleContestWinner = async () => {
        const winner = {
            contestId,
            contestImage,
            contestName,
            contestPrize,
            contestType,
            creator: {
                creatorEmail, creatorName
            },
            applicant: {
                userName, userEmail
            }
        }
        const confirmWinner = await axiosSecure.post('/contest-winner', winner)
        if (confirmWinner.data.insertedId) {
            toast.success('Winner selected successfully')
            refetch()
        }
    }

    return (
        <div className='w-full'>
            <div>

                {
                    userSubmitContest?.map(item => item.submitUserEmail === userEmail ? <img key={item._id} src={item.submitImage} /> : "")
                }
                {
                    userSubmitContest?.map(item => item.submitUserEmail === userEmail ? <p key={item._id}>{item.submitDetails}</p> : "")
                }
            </div>
            <h2>Name : {userName}</h2>
            <p>Email : {userEmail}</p>
            <p>Reg Fee : ${contestRegistrationFee}</p>
            <p>Transaction ID: {transactionId}</p>
            <p>Registration Date : {new Date(regDate).toLocaleDateString()}</p>
            
            {
                matchedWinner ? <button  className="btn btn-sm bg-[#DC2626] my-2 w-full cursor-not-allowed text-white hover:text-black">Already select Winner</button> : <button onClick={handleContestWinner} className="btn btn-sm bg-[#407BFF] my-2 w-full text-white hover:text-black">Mark Winner</button>
            }
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};
ParticipateCard.propTypes = {
    participate: PropTypes.object,
}
export default ParticipateCard;