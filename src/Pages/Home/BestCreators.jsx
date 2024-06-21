
import useContest from '../../Hooks/useContest';
import { useSpring, animated } from '@react-spring/web';
import BestCreatorsCard from './BestCreatorsCard';

const BestCreators = () => {
    const [contests, isLoading, refetch] = useContest();
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
    const creatorsEmails = bestCreators.map( item => item.creatorEmail)
    console.log(creatorsEmails);
    const creatorEmail = creatorsEmails.map(email => email);
    console.log(creatorEmail);
    const bestCreator = bestCreators.map( item => item.contests.slice(0, 3).map(contest => contest))
    console.log(bestCreator);
    

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className=" loading loading-dots loading-lg"></span>
        </div>
    }
    return (
        <div>
            <div className="bg-gray-100 flex flex-col items-center justify-center">
                <div className="bg-blue-600 w-full text-white py-4 text-center">
                    <h1 className="text-2xl font-bold">Top Contest Creators</h1>
                </div>
                <div className='flex gap-5'>
                    {
                        bestCreators.map(creator => <BestCreatorsCard key={creator.creatorEmail} creator={creator}></BestCreatorsCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default BestCreators;