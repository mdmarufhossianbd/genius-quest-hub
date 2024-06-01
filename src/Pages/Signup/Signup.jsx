import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import useAuth from "../../Hooks/useAuth";
import signUpImg from '../../assets/images/login-and-register.png';

const Signup = () => {
    const { signUp, updateUserProfile, setReload, user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true)
    const navigate = useNavigate()

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

    const onSubmit = async (data) => {
        // photo upload
        const imageFile = { image: data.photo[0] }
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`, imageFile, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        const photo = res.data.data.display_url;

        await signUp(data.email, data.password)
            .then(result => {
                console.log(result.user);
                updateUserProfile(data.name, photo, data.email)
                    .then(() => {
                        if (result.user) {
                            toast.success('Your account Create Successfully')
                        }
                        setReload(true)
                    })
            })
            .catch(error => {
                error.message
                if (error.message) {
                    toast.error("This email already use or invalid email.")
                }
            })
    }

    if(user){
        return navigate('/')
    }

    return (
        <div className="max-w-7xl mx-auto mt-20">
            <Helmet><title>Signup || Genius Quest Hub</title></Helmet>
            <div className="flex items-center border-2 p-10 rounded-lg">
                <div className="w-1/2">
                    <img src={signUpImg} alt="" />
                </div>
                <div className="flex flex-col w-1/2 p-10 bg-[#a0bdfc] rounded-lg text-black">
                    <h2 className="text-5xl font-semibold mb-10 text-center">Sign Up</h2>
                    <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
                        <label className="text-xl font-medium">Your Full Name <span className="text-red-700">*</span></label>
                        <input className="p-2 rounded-md" placeholder="Enter your full name." type="text" {...register("name", {
                            required: true
                        })} />
                        {errors.name && <span className="text-red-400">Name is required.</span>}
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
                        
                        <label className="text-xl font-medium">Your Profile Picture <span className="text-red-700">*</span></label>
                        <input type="file" {...register("photo", {
                            required: true
                        })} />
                        {errors.photo && <span className="text-red-400">Profile Picture is required.</span>}                        
                        <input disabled={disabled} className="hover:cursor-pointer bg-red-600 text-white py-2 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed" type="submit" />
                    </form>
                    <p className="text-center pt-4">Already have you an account? <Link to={'/signin'} className="font-semibold">Sign in</Link></p>                    
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
};

export default Signup;