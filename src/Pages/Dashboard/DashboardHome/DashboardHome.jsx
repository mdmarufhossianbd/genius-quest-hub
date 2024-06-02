import { Helmet } from 'react-helmet-async';
import useAuth from '../../../Hooks/useAuth';

const DashboardHome = () => {
    const {user} = useAuth();

    return (
        <div className=''>
            <Helmet><title>Dashboard || Genius Quest Hub</title></Helmet>
            <h2 className='p-20 text-3xl font-bold text-center'>Hey <span className='text-[#407BFF]'>{user?.displayName}</span>, Welcome to Genius Quest Hub.</h2>
        </div>
    );
};

export default DashboardHome;