import PropTypes from 'prop-types';
import useSubmit from "../../../Hooks/useSubmit";
const ParticipateCard = ({ participate }) => {
    const [submitContests] = useSubmit();
    const { contestDeadline, contestId, contestImage, contestName, contestPrize, contestPublishDate, contestRegistrationFee, creatorEmail, creatorName, regDate, transactionId, userEmail, userName, contestType } = participate;

    console.log(participate.contestId);

    const userSubmitContest = submitContests?.filter(item => item.submitContestId === contestId);
    console.log(userSubmitContest);


    const handleCheckSubmission = () => {
        if (userSubmitContest?.length === 0) {
            return alert('not found')
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
            <button className="btn btn-sm bg-[#407BFF] my-2 w-full text-white hover:text-black">Mark Winer</button>
        </div>
    );
};
ParticipateCard.propTypes = {
    participate: PropTypes.object,
}
export default ParticipateCard;