import { Helmet } from 'react-helmet-async';
import useAuth from '../../../Hooks/useAuth';
import useWinner from '../../../Hooks/useWinner';
import useUserRegContest from '../../../Hooks/useUserRegContest';

const DashboardHome = () => {
    const { user } = useAuth();
    const [winnerContest, isLoading] = useWinner();
    const [userRegContest] = useUserRegContest();
    const userWinnerContest = winnerContest.filter(wcontest => wcontest?.applicant?.userEmail === user.email);
    const totalWinCount = (userWinnerContest.length / userRegContest.length) * 100
    const winnerContests = winnerContest.filter(contest => contest?.applicant?.userEmail === user.email)
    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className=" loading loading-dots loading-lg"></span>
        </div>
    }

    return (
        <div className=''>
            <Helmet><title>Dashboard || Genius Quest Hub</title></Helmet>
            <h2 className='p-20 text-3xl font-bold text-center'>Hey <span className='text-[#407BFF]'>{user?.displayName}</span>, Welcome to Genius Quest Hub.</h2>
            {/* account details */}
            <div className='flex flex-col md:flex-row md:justify-center'>
                <div className='md:w-1/2 w-full p-10 '>
                    <h2 className='text-3xl font-semibold mb-5'>Your winning progress</h2>
                    {
                        totalWinCount === Infinity || 0 || isNaN ?<div className="radial-progress font-semibold text-red-500" style={{ "--value": totalWinCount, "--size": "14rem", "--thickness": "1.5rem", }} role="progressbar"><p className='text-black'>{totalWinCount === Infinity ? 0 : isNaN(totalWinCount) ? 0 : totalWinCount}% win of {userRegContest.length} Contest</p></div> :
                            <div className="radial-progress font-semibold text-green-600" style={{ "--value": totalWinCount, "--size": "14rem", "--thickness": "1.5rem", }} role="progressbar"><p className='text-black'>{totalWinCount}% win of {userRegContest.length} Contest</p></div>
                    }
                </div>
                <div className='md:w-1/2 w-full p-10'>
                    <h2 className='text-3xl font-semibold mb-5 text-center'>Your Winning Contest</h2>
                    <div>
                        {
                            userRegContest.length === 0 ? <p className='text-center'>You are not registered any contest.</p> : winnerContests.length === 0 ? <p className='text-center'> You are not selection in winning list.</p> : winnerContests.map(contest => <h2 key={contest._id} className='py-2 text-xl font-semibold border-b-2 border-green-400'>{contest.contestName}</h2>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;