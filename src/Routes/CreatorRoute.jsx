import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useCreator from "../Hooks/useCreator";

const CreatorRoute = ({children}) => {   
    const {user, loading} = useAuth();
    const [creator, isLoading] = useCreator();
    const location = useLocation();
   
    if(loading || isLoading){
        return <div className="flex justify-center items-center min-h-screen">
        <span className=" loading loading-dots loading-lg"></span>
    </div>
    }

    if(user && creator) {
        return children
    }

    return <Navigate to={'/dashboard'} state={{from : location}} replace></Navigate>
};

CreatorRoute.propTypes = {
    children: PropTypes.object
}

export default CreatorRoute;