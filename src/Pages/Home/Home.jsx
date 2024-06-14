import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import PopularContest from "./PopularContest";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home || Genius Quest Hub</title>
            </Helmet>
            {/* banner */}
           <Banner></Banner>
           {/* Popular */}
           <PopularContest></PopularContest>
        </div>
    );
};

export default Home;