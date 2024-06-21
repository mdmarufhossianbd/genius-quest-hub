import {  useState } from "react";
import PopularContestCard from "./PopularContestCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const PopularContest = () => {
    const [asc, setAsc] = useState(true);
    const axiosPublic = useAxiosPublic();
    // const [popularContests, setPopularContests] = useState();


    const {data : popularContests = [], isLoading, refetch, isPending} = useQuery({
        queryKey: ['popularContests'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/popular-contests?sort=${asc ? 'asc' : 'des'}`)
            return res.data;
        }
    });

    if (isLoading || isPending) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className=" loading loading-dots loading-lg"></span>
        </div>
    }
    return (
        <div className="py-10 px-5">
            <div className="lg:w-1/2 w-full mx-auto">
                <h2 className="md:text-5xl text-3xl font-semibold text-center py-4">Popular Contests</h2>
                <p className="text-center ">
                    Welcome to the Popular Contests section. Our featured contests offer amazing prizes, including cash rewards, exclusive gear, and unique opportunities. Join the fun, showcase your talents, and connect with a vibrant community of like-minded individuals. Dive in and see what’s trending – your next big win could be just a click away!</p>
            </div>
            <div className="flex justify-center my-5 ">
                <button onClick={()=>setAsc(!asc, refetch())} className="btn btn-sm">{asc ? 'High to Low' : 'Low to High'}</button>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 py-10">
                {
                   popularContests?.slice(0,6).map(contest => <PopularContestCard key={contest._id} contest={contest}></PopularContestCard>) 
                }                
            </div>
        </div>
    );
};

export default PopularContest;