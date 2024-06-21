const MyWinningCard = ({ item }) => {
    const { contestName, contestImage, contestPrize, contestType } = item;

    return (
        <div className="pb-5 rounded-md bg-green-300">
            <img className="w-full h-[300px] rounded-t" src={contestImage} />
            <h2 className="p-3 text-2xl font-semibold"><span>Name : </span> {contestName}</h2>
            <h2 className="px-3 text-xl "><span className="font-semibold">Contest Winner Prize : </span> {contestPrize}</h2>
            <h2 className="px-3 text-xl "><span className="font-semibold">Contest Type : </span> {contestType}</h2>
        </div>
    );
};

export default MyWinningCard;