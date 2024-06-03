import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const CreatorRoute = ({children}) => {
    
    const {loading} = useAuth()
    const location = useLocation()

    const axiosSecure = useAxiosSecure();
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })
   
    if(loading || users.role == 'Creator'){
        return <div className="flex justify-center items-center min-h-screen">
        <span className=" loading loading-dots loading-lg"></span>
    </div>
    }

    if(user || creator){
        return children
    }

    return <Navigate to={'/'} state={{from : location}} replace></Navigate>
};

CreatorRoute.propTypes = {
    children: PropTypes.object
}

export default CreatorRoute;