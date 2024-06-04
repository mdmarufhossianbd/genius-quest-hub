import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
const AdminRoute = ({ children }) => {

    const {user, loading} = useAuth();
    const [admin, isLoading] = useAdmin();

    if (loading || isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
                    <span className=" loading loading-dots loading-lg"></span>
            </div>
        }
    
    if (user && admin) {
        return children;
    }
    

    return <Navigate to={'/'} state={{ from: location }} replace></Navigate>
};


AdminRoute.propTypes = {
    children: PropTypes.object
}

export default AdminRoute;