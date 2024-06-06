import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import logo from '../../assets/images/logo.png';

const Navber = () => {

    const { user, logOut } = useAuth();

    // set dark theme
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
    const handleToggle = e => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light")
        }
    }

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme)
    }, [theme])

    // navlinks
    const navlinks = <>
        <Link className="text-white font-semibold hover:bg-[#2b2b2b] hover:px-3 hover:py-2 rounded px-3 py-2" to={'/'}>Home</Link>
        <Link className="text-white font-semibold hover:bg-[#2b2b2b] hover:px-3 hover:py-2 rounded px-3 py-2" to={'/contest'}>Contest</Link>
        <Link className="text-white font-semibold hover:bg-[#2b2b2b] hover:px-3 hover:py-2 rounded px-3 py-2" to={'/add-job'}>Add Jobs</Link>
        <Link className="text-white font-semibold hover:bg-[#2b2b2b] hover:px-3 hover:py-2 rounded px-3 py-2" to={'/blog'}>Blog</Link>
    </>

    const userLinks = <>
        <li>
            <Link to={'/dashboard'}>Dashboard</Link>
            <Link to={'/profile'}>Profile</Link>
        </li>
    </>

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

    return (
        <div className="bg-transparent z-20 bg-gradient-to-r from-[#2b2b2bb7] to-[#A0BDFC]">
            <div className="navbar max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <div tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[20] p-2 shadow bg-base-100 rounded-box w-52">
                            {navlinks}
                        </div>
                    </div>
                    <Link to={'/'}> <img width={200} src={logo} alt="" /> </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <div className="menu menu-horizontal flex">
                        {navlinks}
                    </div>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div title={user?.displayName} className="w-10 rounded-full">
                                        <img src={user?.photoURL} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-3 z-[20] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    {
                                        userLinks
                                    }
                                    <li><button onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </div> :
                            <Link to={'/signin'}> <button className="px-4 py-2 text-white font-semibold bg-[#407bff] hover:bg-[#2b2b2b] rounded">Login</button> </Link>
                    }
                </div>
                <label className="swap swap-rotate ml-10">
                    <input type="checkbox" onChange={handleToggle} checked={theme == "light" ? false : true} className="theme-controller toggle" value="synthwave" />
                </label>
            </div>
        </div>
    );
};

export default Navber;