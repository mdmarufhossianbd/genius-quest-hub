import PropTypes from 'prop-types';
const MyRegisteredCard = ({contest}) => {
    const { contestImage, contestName} = contest;
    return (
        <div>
            <h2>{contestName}</h2>
            <img src={contestImage} />
        </div>
    );
};
MyRegisteredCard.propTypes = {
    contest: PropTypes.object
}
export default MyRegisteredCard;