import PropTypes from 'prop-types';
const PopularContestCard = ({ contest }) => {
    const { contestName, contestImage, contestDescription, contestParticipateCount, _id } = contest;
    return (
        <div className='bg-[#5D5CFF] p-5 rounded-md '>
            <img className='w-full h-[250px] object-cover' src={contestImage} />
            <h2 className='text-xl py-4 text-white'>{contestName}</h2>
            <p>{
                contestDescription.length >= 65 ? contestDescription.slice(0, 65) + "..." : contestDescription
            }</p>
            <div className='flex justify-between items-center'>
                <p>Total Participate : {contestParticipateCount}</p>
                <button className='hover:bg-slate-500 bg-[#dc2626f5] p-3 rounded-md w-1/2 text-white'>Details</button>
            </div>
        </div>
    );
};
PopularContestCard.propTypes = {
    contest: PropTypes.object
}

export default PopularContestCard;