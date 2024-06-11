import PropTypes from 'prop-types';

const ParticipateCard = ({ participate }) => {

    const { userName, userEmail, transactionId, regDate, contestRegistrationFee, } = participate;

    return (
        <div>
            <h2>Name : {userName}</h2>
            <p>Email : {userEmail}</p>
            <p>Reg Fee : ${contestRegistrationFee}</p>
            <p>Transaction ID: {transactionId}</p>
            <p>Registration Date : {new Date(regDate).toLocaleDateString()}</p>
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Hello!</h3>
                    <p className="py-4">This modal works with a hidden checkbox!</p>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
            <label htmlFor="my_modal_7" className="btn btn-sm bg-[#407BFF] my-2 w-full text-white hover:text-black">Check Submission</label>
            
        </div>
    );
};
ParticipateCard.propTypes = {
    participate: PropTypes.object
}
export default ParticipateCard;