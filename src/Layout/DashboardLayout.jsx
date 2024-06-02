import toast from 'react-hot-toast';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import Logo from '../assets/images/logo.png';
const DashboardLayout = () => {
    const { logOut } = useAuth();

    // logout
    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('Your account logout successfully')
            })
            .catch((error) => {
                toast.error(`${error.message}`)
            })
    }

    const userLinks = <>
        <li className='text-lg font-medium flex flex-col p-3 mt-10'>
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg' to={'/'}>Home</Link>
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg' to={'/dashboard/add-contest'}>Add</Link>
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg' to={'/my-applied-jobs'}>My Winning Contest Page</Link>
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg' to={'/profile'}>My Profile</Link>
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg' ><button onClick={handleLogout}>Logout</button></Link>
        </li>
    </>


    return (
        <div className='max-w-7xl mx-auto flex'>
            {/* Dashboard sidebar */}
            <div className='min-h-screen w-72 bg-[#a0bdfcd8] flex flex-col'>
                <Link className='my-5 mx-2' to={'/'}><img src={Logo} /></Link>
                {
                    userLinks
                }
            </div>
            {/* dashboard content */}
            <div className='w-full pl-5'>
                <Outlet></Outlet>
            </div>


        </div>
    );
};

export default DashboardLayout;