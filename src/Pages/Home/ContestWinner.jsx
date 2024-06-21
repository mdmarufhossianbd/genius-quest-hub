import { Link } from "react-router-dom";
import useWinner from "../../Hooks/useWinner";
import useRegisterContest from "../../Hooks/useRegisterContest";
import winnerImg from "../../assets/images/winner.jpg"
const ContestWinner = () => {
    const [winnerContest] = useWinner();
    const [regContest] = useRegisterContest();
    // winner total contest
    const totalWinContest = winnerContest => {
        const emailCount = {};
        winnerContest.forEach(({ applicant: { userEmail } }) => {
            emailCount[userEmail] = (emailCount[userEmail] || 0) + 1;
        });

        const duplicates = Object.keys(emailCount).filter(email => emailCount[email] > 1);
        const duplicateCount = winnerContest.filter(({ applicant: { userEmail } }) => duplicates.includes(userEmail)).length;
        return duplicateCount;
    };

    // winner username
    const emailandUserName = winnerContest.map(entry => ({
        email: entry.applicant.userEmail,
        userName: entry.applicant.userName
    }));

    const emailCounts = emailandUserName.reduce((acc, { email, userName }) => {
        if (!acc[email]) {
            acc[email] = { count: 0, userName: userName };
        }
        acc[email].count += 1;
        return acc;
    }, {});

    const winner = Object.entries(emailCounts)
        .filter(([email, data]) => data.count > 1)
        .map(([email, data]) => ({ userEmail: email, userName: data.userName }));
    
    // winner total reg contest.
    const winnerRegContests = regContest.filter(item => item.userEmail === winner[0]?.userEmail);

    return (
        <div className="flex flex-col items-center text-center p-20 bg-gray-300 rounded-lg max-w-7xl mx-auto my-20">
           
            <h1 className="text-gray-800 text-5xl mb-8 font-semibold">Participate and Win Big! </h1>
            <div className="bg-white rounded-lg p-6 shadow-md w-full mb-8">
                <h2 className="font-sans text-blue-500 text-3xl mb-4 font-semibold">🥇 Contest Winner 🥇</h2>
                <img src={winnerImg} alt="Winner" className="rounded-full mb-4 w-52 h-52 mx-auto" />
                <p className="font-sans text-gray-600 text-lg">Congratulations to <strong>{winner[0]?.userName}</strong> for winning the latest contest with an outstanding entry!</p>
            </div>

            <div className="flex justify-around w-full mb-8">
                <div className="bg-blue-500 text-white p-6 rounded-lg w-1/3 shadow-md">
                    <h3 className="font-sans text-2xl">Total Participants</h3>
                    <p className="font-sans text-xl">{winnerRegContests.length}</p>
                </div>
                <div className="bg-green-500 text-white p-6 rounded-lg w-1/3 shadow-md">
                    <h3 className="font-sans text-2xl">Total Contests Won</h3>
                    <p className="font-sans text-xl">{totalWinContest(winnerContest)}</p>
                </div>
            </div>
            
            <div className="bg-gray-200 rounded-lg p-6 shadow-md w-full">
                <h2 className="font-sans text-gray-800 text-3xl mb-4">Ready to Take the Challenge?</h2>
                <p className="font-sans text-gray-600 text-lg mb-6">Don't miss your chance to be our next star! Participate in our exciting contests and showcase your talent to the world.</p>
                <Link to={'/signin'} className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg transition duration-300 hover:bg-blue-700">
                    Join Now!
                </Link>
            </div>
        </div>
    );

};

export default ContestWinner;