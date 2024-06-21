import { SwiperSlide } from 'swiper/react';
const BestCreatorsCard = ({ creator }) => {

    const { creatorEmail, creatorName, contests } = creator;
    console.log(contests);
    return (
        <div>
            {/* <div>
                <img src="https://via.placeholder.com/150" alt="" />
                <h2>Name : {creatorName}</h2>
            </div>
            <div className='flex flex-col '>
                {
                    contests.slice(0, 3).map(contest => <p key={contest._id} className='border-b-2 border-green-600'>{contest.contestName}</p>)
                }
                
            </div> */}

            <SwiperSlide className='flex'>
                <div>
                    <img src="https://via.placeholder.com/150" alt="" />
                    <h2>Name : {creatorName}</h2>
                </div>
                {/* <div className='flex flex-col'>
                    {
                        contests.slice(0, 3).map(contest => <p key={contest._id} className='border-b-2 border-green-600'>{contest.contestName}</p>)
                    }

                </div> */}
            </SwiperSlide>
        </div>
    );
};

export default BestCreatorsCard;