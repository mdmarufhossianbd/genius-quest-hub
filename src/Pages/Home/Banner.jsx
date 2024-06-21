import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import { Typewriter } from 'react-simple-typewriter'
import slider1 from '../../assets/images/slider (1).png'
import slider2 from '../../assets/images/slider (2).png'
import slider3 from '../../assets/images/slider (3).png'
import slider4 from '../../assets/images/slider (4).png'
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import ContestCard from '../../Components/Shared/ContestCard';

const Banner = () => {
    const axiosPublic = useAxiosPublic()
    const [queryContest, setQueryContest] = useState([]);
    const [searchKW, setSearchKW] = useState('')

    useEffect(() => {
        axiosPublic.get(`/search?keyword=${searchKW}`)
            .then(data => {
                setQueryContest(data.data)
            })
    }, [searchKW, axiosPublic])

    const handleSearch = e => {
        e.preventDefault();
        const searchKW = e.target.search.value;
        setSearchKW(searchKW);
        e.target.reset()
    }


    return (
        <div className=''>
            <div className='flex md:flex-row flex-col-reverse gap-5 bg-[#a0bdfc9a]'>
                <div className='flex flex-col justify-center p-5'>
                    <h2 className='text-3xl text-center my-5'>Unleash Your Creativity! Join Our Exciting Contests Today.</h2>
                    <h2 className='text-5xl font-semibold text-center text-[#000000d5]'>
                        <Typewriter
                            cursor
                            cursorBlinking
                            delaySpeed={1500}
                            deleteSpeed={50}
                            loop={true}
                            typeSpeed={90}
                            words={[
                                'Image Design',
                                'Article Writing',
                                ' Marketing Strategy',
                                'Digital Advertisement',
                                'Gaming Review',
                                'Book Review',
                                'Business Idea',
                                'Movie Review'
                            ]}
                        />
                    </h2>
                    <div className='my-2 text-center'>
                        <form className='flex' onSubmit={handleSearch} >
                            <input className='w-[70%] p-3 rounded-l-md' type="text" name="search" placeholder='Type here which contest your want to join' />
                            <input className='py-3 px-10 rounded-r-md bg-[#dc2626] text-white hover:cursor-pointer' type="submit" value="Search" />
                        </form>
                    </div>
                </div>
                <div className='md:w-1/2 w-full lg:p-20 md:p-12 p-10 rounded'>
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={30}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper"
                    >
                        <SwiperSlide><img className='rounded' src={slider1} alt="" /></SwiperSlide>
                        <SwiperSlide><img className='rounded' src={slider2} alt="" /></SwiperSlide>
                        <SwiperSlide><img className='rounded' src={slider3} alt="" /></SwiperSlide>
                        <SwiperSlide><img className='rounded' src={slider4} alt="" /></SwiperSlide>

                    </Swiper>
                </div>
            </div>
            {/* search result */}
            {
             searchKW === '' ? '' :  <h2 className='text-center font-semibold text-3xl text-[#000000d5] bg-[#a0bdfc9a]'>{queryContest.length === 0 ? `sorry not found any contest for ${searchKW}` : `Search result for ${searchKW}`}</h2>
            }
            <div className='bg-[#a0bdfc9a] grid md:grid-cols-2 grid-cols-1 gap-5 p-5'>                
                {
                    searchKW === '' ? '' : queryContest.map(contest => <ContestCard key={contest._id} contest={contest}></ContestCard>)
                }
            </div>
        </div>
    );
};

export default Banner;