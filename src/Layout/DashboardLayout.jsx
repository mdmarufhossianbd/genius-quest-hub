import toast from 'react-hot-toast';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import Logo from '../assets/images/logo.png';
const DashboardLayout = () => {
    const {logOut } = useAuth();
    // Todo : admin and creator need to create and emplement.
    const isAdmin = true;
    const isCreator = false;

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
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg mx-2' to={'/'}>Home</Link>
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg mx-2' to={'/dashboard/add-contest'}>Add</Link>
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg mx-2' to={'/my-applied-jobs'}>My Winning Contest Page</Link>
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg mx-2' to={'/profile'}>My Profile</Link>
            <Link><button className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg w-full text-left' onClick={handleLogout}>Logout</button></Link>
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
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg mx-2' to={'/dashboard/manage-user'}>Add Contest</Link>
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg mx-2' to={'/my-applied-jobs'}>My Contest</Link>
            <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg mx-2' to={'/my-applied-jobs'}>Submitted Contest</Link>
        </li>
    </>


    return (
        <div className='max-w-7xl mx-auto flex'>
            {/* Dashboard sidebar */}
            <div className='min-h-screen w-72 bg-[#a0bdfcd8] flex flex-col'>
                <Link className='my-5 px-4' to={'/'}><img src={Logo} /></Link>
                <Link className='hover:bg-[#2b2b2bb7] hover:text-[#fff] px-5 py-2 rounded-lg mx-2 text-black' to={'/'}>Home</Link>
                {
                    isCreator ? creatorLinks : ""
                }
                {
                   isAdmin ? adminLinks : userLinks
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