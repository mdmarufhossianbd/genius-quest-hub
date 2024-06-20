import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navber from "../../Components/Navber/Navber";

const ErrorPage = () => {
    return (
        <div>
            <Navber></Navber>
            <div className="py-32 flex flex-col items-center">
                <h2 className="text-8xl font-black ">Oops!</h2>
                <h3 className="font-semibold text-3xl mt-10 mb-5">4O4 PAGE NOT FOUND.</h3>
                <p>This page you are looking might have been removed had its name changed or is temporarily unavailable.</p>
                <Link to={'/'} className="btn btn-sm my-2 bg-[#5D5CFF] text-white hover:text-black">Go to Home</Link>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ErrorPage;