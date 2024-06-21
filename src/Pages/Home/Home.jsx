import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import PopularContest from "./PopularContest";
import ContestWinner from "./ContestWinner";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home || Genius Quest Hub</title>
            </Helmet>
           <Banner></Banner>
           <PopularContest></PopularContest>
           <ContestWinner></ContestWinner>
        </div>
    );
};

export default Home;