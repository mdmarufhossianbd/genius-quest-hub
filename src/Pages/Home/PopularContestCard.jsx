import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
                <Link className='hover:bg-slate-500 bg-[#dc2626f5] py-3 px-8 rounded-md ' to={`/contest/details/${_id}`}><button className=' text-white text-center'>Details</button></Link>
            </div>
        </div>
    );
};
PopularContestCard.propTypes = {
    contest: PropTypes.object
}

export default PopularContestCard;