
const BestCreatorsCard = ({ creator }) => {

    const { creatorEmail, creatorName, contests } = creator;
    console.log(contests);
    return (
        <div className='flex bg-slate-500 p-4'>
            <div>
                <img src="https://via.placeholder.com/150" alt="" />
                <h2>Name : {creatorName}</h2>
            </div>
            <div className='flex flex-col '>
                {
                    contests.slice(0, 3).map(contest => <p key={contest._id} className='border-b-2 border-green-600'>{contest.contestName}</p>)
                }
            </div>
        </div>
    );
};

export default BestCreatorsCard;