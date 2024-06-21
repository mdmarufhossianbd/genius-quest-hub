import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css';
import useContest from '../../Hooks/useContest';
import { Autoplay, Pagination } from 'swiper/modules';
const BestCreators = () => {
    const [contests, isLoading] = useContest();
    // Step 1: Group contests by creator
    const creators = {};

    contests.forEach(contest => {
        const email = contest.creatorEmail;
        if (!creators[email]) {
            creators[email] = {
                creatorEmail: contest.creatorEmail,
                creatorName: contest.creatorName,
                contests: []
            };
        }
        creators[email].contests.push(contest);
    });

    // Step 2: Filter creators with at least 3 contests
    const bestCreators = Object.values(creators).filter(creator => creator.contests.length >= 3);
    console.log(bestCreators);
    // Step 3: Log or use the filtered creators
    const creatorsEmails = bestCreators.map(item => item.creatorEmail)
    console.log(creatorsEmails);
    const creatorEmail = creatorsEmails.map(email => email);
    console.log(creatorEmail);
    const bestCreator = bestCreators.map(item => item.contests.slice(0, 3).map(contest => contest))
    console.log(bestCreator);


    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className=" loading loading-dots loading-lg"></span>
        </div>
    }
    return (
        <div>
            <div className="bg-[#22c55e] w-full text-white py-4 text-center">
                <h1 className="text-2xl font-bold">Top Contest Creators</h1>
            </div>
            <div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper m-5"
                >
                    {
                        bestCreators.map(creator => <SwiperSlide key={creator.creatorEmail} className=' p-4 bg-[#D7D7FF] rounded' >
                            <div className='flex gap-5'>
                                <div>
                                    <img className='rounded-md' src="https://via.placeholder.com/150" alt="" />
                                </div>
                                <div className='flex flex-col'>
                                    {
                                        creator.contests.slice(0, 3).map(contest => <p key={contest._id} className='border-b-2 border-green-600 rounded-md py-2'>{contest.contestName}</p>)
                                    }
                                </div>
                            </div>
                            <h2 className='pt-4 text-2xl font-semibold'>Name : {creator.creatorName}</h2>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default BestCreators;