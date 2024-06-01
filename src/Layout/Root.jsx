import { Outlet } from 'react-router-dom';
import Navber from '../Components/Navber/Navber';

const Root = () => {
    return (
        <div className='font-poppins'>
            <Navber></Navber>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;