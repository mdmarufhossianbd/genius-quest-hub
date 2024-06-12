import { Helmet } from "react-helmet-async";
import Banner from "./Banner";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home || Genius Quest Hub</title>
            </Helmet>
            {/* banner */}
           <Banner></Banner>
        </div>
    );
};

export default Home;