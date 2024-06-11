import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const SubmitContestFrom = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const contestId = queryParams.get('contestId');

    console.log(contestId);

    const onSubmit = async (data) => {
        // image upload
        const imgFile = { image: data.image[0] }
        const res = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`, imgFile, {
            headers: {
                'content-Type': 'multipart/form-data'
            }
        });
        // add submitedContest in database
        if (res.data.success) {
            const contestSubmision = {
                submitImage: res.data.data.display_url,
                submitDetails: data.details,
                submitContestId: contestId,
                submitUserName: user?.displayName,
                submitUserEmail: user?.email
            }
            axiosSecure.post('/submit-contest', contestSubmision)
            .then(res=>{
                if(res.data.insertedId){
                    toast.success('Your contest submited successfully');
                    navigate(-1)
                }
            })
        }
    }

    return (
        <div>
            <h2 className="text-3xl text-center">Submit your contest</h2>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <label>Select your contest relative banner.</label>
                <input type="file" {...register("image")} />
                <div>
                    <label>Write about your contest.</label>
                    <textarea className="border w-full p-5 my-4" placeholder="Write here your contest details" type="text" rows={20} {...register('details')} id=""></textarea>
                </div>
                <div className="flex justify-between">
                    <button onClick={() => navigate(-1)} className="w-1/3 btn btn-sm">Back</button>
                    <input className="w-1/3 btn btn-sm " type="submit" />
                </div>
            </form>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
};

export default SubmitContestFrom;