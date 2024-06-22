import useWinner from "../../Hooks/useWinner";


const ContestWinner = () => {
    const [winnerContest, isLoading] = useWinner();
    const winners = winnerContest.map( item => item.applicant)
    const skipDuplucateWinners = winners.reduce((acc, current) => {
        if (!acc.some(user => user?.userEmail === current?.userEmail)) {
            acc.push(current);
        }
        return acc;
    }, []);
    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className=" loading loading-dots loading-lg"></span>
        </div>
    }
    return (
        <div className="max-7xl mx-auto pb-20">
            <h2 className="text-3xl font-semibold md:text-5xl text-center md:py-20 py-10">Contest Winners</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 md:mx-10 mx-5">
                {
                    skipDuplucateWinners.map( item =>
                    <div className="bg-[#D7D7FF] rounded" key={item?.userEmail}>
                        <img className="rounded-t w-full h-[350px] object-cover" src={item?.userPhoto} />
                        <h2 className="text-2xl font-semibold p-4">{item?.userName}</h2>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ContestWinner;