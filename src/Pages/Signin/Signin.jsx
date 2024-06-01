import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from "react-simple-captcha";
import useAuth from "../../Hooks/useAuth";
import signUpImg from "../../assets/images/login-and-register.png";

const Signin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [disabled, setDisabled] = useState(true)
    const {signIn, user} = useAuth();
    const navigate = useNavigate();
    
    // captcha validation
    const captchaRef = useRef(null);
    useEffect(() => {
        loadCaptchaEnginge(6)
    }, [])

    const handleCaptchaValidate = () => {
        const captchaValue = captchaRef.current.value;
        if (validateCaptcha(captchaValue)) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
            toast.error('Enter valid Captcha')
        }
    }

    // handleSignin
    const onSubmit = (data) => {
        signIn(data.email, data.password)
        .then(result=>{
            console.log(result.user);
        })
        .catch(err=>console.log(err.message))
    }

    if(user){
        return navigate('/')
    }

    return (
        <div className="max-w-7xl mx-auto pt-20">
            <Helmet><title>Signin || Genius Quest Hub</title></Helmet>
            <div className="flex items-center border-2 rounded-lg p-10">                
                <div className="flex flex-col w-1/2 p-10 bg-[#a0bdfc] rounded-lg text-black">
                    <h2 className="text-5xl font-semibold mb-10 text-center">Sign In</h2>
                    <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
                        
                        <label className="text-xl font-medium">Your Email <span className="text-red-700">*</span></label>
                        <input className="p-2 rounded-md" placeholder="Enter your valid e-mail." type="email" {...register("email", {
                            required: true
                        })} />
                        {errors.email && <span className="text-red-400">Email is required.</span>}
                        <label className="text-xl font-medium">Your Password <span className="text-red-700">*</span></label>
                        <input className="p-2 rounded-md" placeholder="Enter password." type="password" {...register("password", {
                            required: true, minLength: 6
                        })} />
                        {errors.password && <span className="text-red-400">Password is required & 6 characters must be use.</span>}
                        <LoadCanvasTemplate  reloadColor="black" />
                        <input className="p-2 rounded-md" onBlur={handleCaptchaValidate} type="text" name="captcha" ref={captchaRef} placeholder="Input valid captcha." id="" />
                        
                                             
                        <input disabled={disabled} className="hover:cursor-pointer bg-red-600 text-white py-2 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed" type="submit" />
                    </form>
                    <p className="text-center pt-4">You have not an account? <Link to={'/signup'} className="font-semibold">Sign Up</Link></p>                    
                </div>
                <div className="w-1/2">
                    <img src={signUpImg} alt="" />
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
};

export default Signin;