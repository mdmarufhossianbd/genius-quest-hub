import { useEffect, useState } from "react";
import ContestCart from "./ContestCart";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Contest = () => {
    const axiosPublic = useAxiosPublic();
    const itemPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const [contestCount, setContestCount] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/total-contest')
            .then(res => res.json())
            .then(data => {
                setContestCount(data.count)
            })
    }, [])

    const { data: contests = [], isLoading, refetch } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/contests?page=${currentPage}&size=${itemPerPage}`)
            return res.data;
        }
    });
    const publishContest = contests?.filter(item => item.contestStatus === 'Publish')
    const numberOfPages = Math.ceil(contestCount / itemPerPage)
    const pages = [...Array(numberOfPages).keys()]

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className=" loading loading-dots loading-lg"></span>
        </div>
    }

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
            refetch()
        }
    }

    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
            refetch()
        }
    }

    const handlePagination = (page) => {
        setCurrentPage(page);
        refetch();
    }


    return (
        <div className="max-w-7xl mx-auto py-20">
            <h2>All Contest</h2>
            <div className="grid md:grid-cols-2 gap-5">
                {
                    publishContest.map(contest => <ContestCart key={contest._id} contest={contest} ></ContestCart>)
                }
            </div>
            <div className="text-center py-5">
                <button onClick={handlePrev} className="btn">Prev</button>
                {
                    pages.map(page => <button key={page} onClick={() => handlePagination(page)}
                        className={currentPage === page ? 'bg-red-600 btn text-white' : 'btn'}
                    >{page + 1}</button>)
                }
                <button onClick={handleNext} className="btn">Next</button>
            </div>
        </div>
    );
};

export default Contest;