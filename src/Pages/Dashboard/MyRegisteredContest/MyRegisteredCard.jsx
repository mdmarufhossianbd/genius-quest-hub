import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
const MyRegisteredCard = ({ contest }) => {
    const navigate = useNavigate();
    
    const { contestImage, contestName, contestPrize, contestRegistrationFee, contestType, regDate, transactionId, contestId, _id } = contest;
    
    const handleSubmit = () => {
        navigate(`/dashboard/contest-submision/${_id}?contestId=${contestId}`) 
    }
    return (
        <div className='w-full bg-[#D7D7FF] rounded'>
            <img className='w-full h-[300px] object-cover rounded-t' src={contestImage} />
            <div className='p-4'>
                <h2 className='text-2xl py-2'>{contestName}</h2>
                <p>Contest Category : {contestType}</p>
                <p>Contest Prize : {contestPrize}</p>
                <p>Registration Fee : {contestRegistrationFee}</p>
                <p>Transaction Id : {transactionId}</p>
                <p>Registration Date : {new Date(regDate).toLocaleDateString()}</p>
                <button onClick={handleSubmit} className="btn btn-sm bg-[#407BFF] my-2 w-full text-white hover:text-black">Submit your work</button>
            </div>
        </div>
    );
};
MyRegisteredCard.propTypes = {
    contest: PropTypes.object
}
export default MyRegisteredCard;