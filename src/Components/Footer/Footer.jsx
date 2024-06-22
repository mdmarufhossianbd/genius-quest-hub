import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

import logo from '../../assets/images/logo.png'
const Footer = () => {
    return (
        <div>
            <div>
                <footer className="footer gap-5 p-10 bg-base-200 text-base-content">
                    <div className='w-64'>
                        <Link to={'/'}><img className='w-60' src={logo} alt="" /></Link>
                        <p className='text-center'>Genius Quest Hub is a biggest online contest particapate platfrom.</p>
                    </div>
                    <nav>
                        <h6 className="footer-title">Important Links</h6>
                        <Link className='link link-hover' to={'/contest'}>Contests</Link>
                        <Link className='link link-hover' to={'/signin'}>Become a Creator</Link>
                        <Link className='link link-hover' to={'/signup'}>Join</Link>
                        
                    </nav>
                    <nav>
                        <h6 className="footer-title">Pages</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                    </nav>
                    <nav className='*:'>
                        <h6 className="footer-title">Social Links</h6>
                        
                        <a className="link link-hover flex items-center justify-center gap-2"><FaFacebook />Facebook</a>
                        <a className="link link-hover flex items-center justify-center gap-2"><FaLinkedin />Linkedin</a>
                        <a className="link link-hover flex items-center justify-center gap-2"><FaInstagram/>Instagram</a>
                        <a className="link link-hover flex items-center justify-center gap-2"><FaYoutube/>Youtube</a>
                    </nav>
                </footer>
            </div>
            <div className="footer-center p-4 bg-gradient-to-r from-[#7D2AE8] via-purple-500 to-[#05A659]">
                <aside>
                    <p className="text-white">Copyright © 2024 - All right reserved by <Link className="underline" to={'/'}>Genius Quest Hub.</Link></p>
                </aside>
            </div>
        </div>
    );
};

export default Footer;