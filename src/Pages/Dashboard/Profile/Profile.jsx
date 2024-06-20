import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import useUsers from "../../../Hooks/useUsers";
import toast, { Toaster } from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";

const Profile = () => {
    const [users, userLoading] = useUsers();
    const axiosPublic = useAxiosPublic()
    const { user, updateUserProfile, setReload } = useAuth();
    console.log(user,);
    const { register, handleSubmit, resetField, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const imageFile = { image: data.photo[0] }
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`, imageFile, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        const photo = res.data.data.display_url;
        await updateUserProfile(data.name, photo)
            .then(() => {
                setReload(true);
                const profileInfoUpdate = {
                    name: data.name,
                }
                axiosPublic.put(`/update-user/${users._id}`, profileInfoUpdate)
                resetField('name', 'photo')
                toast.success('Your account update successfully');
            })
    }

    if (userLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className=" loading loading-dots loading-lg"></span>
        </div>
    }


    return (
        <div>            
            <div className="flex">
                <div className="w-1/2 flex flex-col items-center py-10 gap-3">
                    <img className="rounded-full w-56 h-56 object-cover" src={user?.photoURL} alt="" />
                    <h3 className="text-3xl font-semibold">Name : {user?.displayName}</h3>
                    <p>Email : {user?.email}</p>
                    <p>Role : Your role is {users?.role ? users?.role : 'Generel User'}</p>
                    <p>Account status : Your account status is now {users?.status ? users?.status : 'Unblock'}</p>
                </div>
                <div className="w-1/2 p-4">
                    <h2 className="text-center py-5 text-3xl font-semibold">Update your profile</h2>
                    <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
                        <label className="text-xl font-medium">Your Full Name <span className="text-red-700">*</span></label>
                        <input className="p-2 rounded-md" placeholder="Enter your full name." type="text" {...register("name", {
                            required: true
                        })} />
                        {errors.name && <span className="text-red-400">Name is required.</span>}
                        <label className="text-xl font-medium">Your Profile Picture <span className="text-red-700">*</span></label>
                        <input type="file" {...register("photo", {
                            required: true
                        })} />
                        {errors.photo && <span className="text-red-400">Profile Picture is required.</span>}
                        <input className="hover:cursor-pointer bg-red-600 text-white py-2 rounded-lg " type="submit" />
                    </form>
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
};

export default Profile;