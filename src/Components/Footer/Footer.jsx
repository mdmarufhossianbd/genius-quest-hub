import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <div className="footer-center p-4 bg-gradient-to-r from-[#7D2AE8] via-purple-500 to-[#05A659]">
                <aside>
                    <p className="text-white">Copyright © 2024 - All right reserved by <Link className="underline" to={'/'}>Genius Quest Hub.</Link></p>
                </aside>
            </div>
        </div>
    );
};

export default Footer;