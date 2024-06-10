import toast from 'react-hot-toast';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import useAuth from '../Hooks/useAuth';
import useCreator from '../Hooks/useCreator';
import Logo from '../assets/images/logo.png';
const DashboardLayout = () => {
    const {logOut } = useAuth();
    const [admin] = useAdmin();
    const [creator] = useCreator();

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
        <li className='flex flex-col text-black'> 
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg mx-2' to={'/dashboard/my-registered-contest'}>My Registered Contest</Link>
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg mx-2' to={'/dashboard/profile'}>My Profile</Link>
            
        </li>
    </>

    const adminLinks = <>
        <li className='flex flex-col text-black'>            
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg mx-2' to={'/dashboard/manage-user'}>Manage User</Link>
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg mx-2' to={'/dashboard/manage-contest'}>Manage Contest</Link>
        </li>
    </>

    const creatorLinks = <>
        <li className='flex flex-col text-black'>            
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg mx-2' to={'/dashboard/add-contest'}>Add Contest</Link>
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg mx-2' to={'/dashboard/my-contest'}>My Contest</Link>
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg mx-2' to={'/dashboard/profile'}>My Profile</Link>
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg mx-2' to={'/dashboard/registered-contest'}>Registered Contest</Link>
        </li>
    </>


    return (
        <div className='max-w-7xl mx-auto flex'>
            {/* Dashboard sidebar */}
            <div className='min-h-screen w-72 bg-[#a0bdfcd8] flex flex-col'>
                <Link className='my-5 px-4' to={'/'}><img src={Logo} /></Link>
                <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg mx-2 text-black' to={'/dashboard'}>Dashboard</Link>
                {
                    admin ? adminLinks : creator ? creatorLinks : userLinks
                }               
                <Link className='mx-2 text-black'><button className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg w-full text-left ' onClick={handleLogout}>Logout</button></Link>
            </div>
            {/* dashboard content */}
            <div className='w-full pl-5 mt-20'>
                <Outlet></Outlet>
            </div>


        </div>
    );
};

export default DashboardLayout;