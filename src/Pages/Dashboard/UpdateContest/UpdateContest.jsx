import { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import useAllUser from "../../../Hooks/useAllUser";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const UpdateContest = () => {
    const { register, handleSubmit, formState: { errors }  } = useForm();
    const [startDate, setStartDate] = useState(new Date());
    const axiosPublic = useAxiosPublic();
    // user checking for block or unblock
    const [confirmUpdateContest, setConfirmUpdateContest] = useState(false);
    const [allUser, isLoading] = useAllUser();
    const {user} = useAuth();
    const userEmail = user?.email;    
    const contest = useLoaderData();

    const {_id, contestName, contestDescription, contestRegistrationFee, contestPrize, contestInstructions, contestContestType, contestDeadline} = contest;

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className=" loading loading-dots loading-lg"></span>
        </div>
    }

    const loginUser = allUser.find(user => user?.email ===  userEmail)
    // update contest
    const onSubmit = async (data) => {
        // user status checking
        if(loginUser.status === 'block')
            return toast.error('Your account is block. For update contest unblock your account')
        else{
            setConfirmUpdateContest(true);
            const imgFile = { image: data.image[0] }
            const res = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`, imgFile, {
                headers: {
                    'content-Type': 'multipart/form-data'
                }
            });
            if(res.data.success){
                const contest = {
                    contestName: data.name,
                    contestImage: res.data.data.display_url,
                    contestDescription: data.description,
                    contestRegistrationFee: parseInt(data.contest_fee),
                    contestPrize: data.contest_prize,
                    contestInstructions: data.instruction,
                    contestContestType: data.contest_type,
                    contestPublishDate: new Date(),
                    contestDeadline: startDate,
                }
                const updateContest = await axiosPublic.put(`contests/${_id}`, contest);
                if(updateContest.data){
                    toast.success('Contest update successfully');
                    setConfirmUpdateContest(false)
                }
            }
        }
    }

    return (
        <div className="bg-[#D6EAFF] md:p-10 p-5  rounded-lg">
            <h2 className="text-5xl font-bold text-center pb-10">Update Contest</h2>
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-5">
                    <div className="flex flex-col w-1/2">
                        <label className="text-xl pb-1">Contest name</label>
                        <input className="p-2 rounded-md" placeholder="Enter your contest name." defaultValue={contestName} type="text" {...register("name")} />                        
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label className="text-xl pb-1">Contest image</label>
                        <input className="pt-1" type="file" {...register("image", {required : true})} />
                        {errors.image && <span className="text-red-400 py-1">Contest image is required.</span>}
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="text-xl pb-1">Contest description</label>
                    <textarea className="rounded-md p-2 resize-none" placeholder="Enter your contest description." rows={8} type="text" defaultValue={contestDescription} {...register("description")}></textarea>                    
                </div>
                <div className="flex gap-5">
                    <div className="flex flex-col w-1/2">
                        <label className="text-xl pb-1">Registration Fee</label>
                        <input type="number" className="p-2 rounded-md" placeholder="Enter contest registration fee." defaultValue={contestRegistrationFee} {...register("contest_fee")} />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label className="text-xl pb-1">Contest prize</label>
                        <input className="p-2 rounded-md " type="text" placeholder="Enter contest prize" defaultValue={contestPrize} {...register("contest_prize")} id="" />                        
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="text-xl pb-1">Contest instructions</label>
                    <textarea className="rounded-md p-2 resize-none" placeholder="Enter contest submit instructions" defaultValue={contestInstructions} rows={8} {...register("instruction")}></textarea>                    
                </div>
                <div className="flex gap-5">
                    <div className="flex flex-col w-1/2">
                        <label className="text-xl pb-1">Select contest type</label>
                        <select className="p-2 rounded-md" defaultValue={contestContestType} {...register("contest_type")}>
                            <option disabled>Choose a contest type</option>
                            <option value="Image Design">Image Design</option>
                            <option value="Article Writing">Article Writing</option>
                            <option value="Marketing Strategy">Marketing Strategy</option>
                            <option value="Digital Advertisement">Digital Advertisement</option>
                            <option value="Gaming Review">Gaming Review</option>
                            <option value="Book Review">Book Review</option>
                            <option value="Business Idea">Business Idea</option>
                            <option value="Movie Review">Movie Review</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label className="text-xl pb-1">Registration Deadline</label>
                        <DatePicker defaultValue={contestDeadline} className="p-2 rounded-md w-full" required selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                </div>
                <div className="flex justify-end">
                    <input className="bg-[#407bff] text-white rounded-lg p-2 font-semibold hover:cursor-pointer hover:bg-[#2b2b2b] transition duration-300 w-[200px] disabled:cursor-not-allowed" disabled={!confirmUpdateContest === false} type="submit" value={confirmUpdateContest ? 'Submiting' : 'Submit'} />
                </div>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </form>
        </div>
    );
};

export default UpdateContest;