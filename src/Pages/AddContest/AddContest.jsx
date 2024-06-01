import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

const AddContest = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [startDate, setStartDate] = useState(new Date())
    
    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="max-w-7xl mx-auto my-20 p-20 rounded-lg bg-[#D6EAFF] text-[#0F0F0F]">
            <h2 className="text-5xl font-bold text-center pb-10">Add Contest</h2>
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-5">
                    <div className="flex flex-col w-1/2">
                        <label className="text-xl pb-1">Contest name</label>
                        <input className="p-2 rounded-md" placeholder="Enter your contest name." type="text" {...register("name", { required: true })} />
                        {errors.name && <span className="text-red-400 py-1">Contest name is required.</span>}
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label className="text-xl pb-1">Contest image</label>
                        <input className="pt-1" type="file" {...register("image", { required: true })} />
                        {errors.image && <span className="text-red-400 py-1">Contest image is required.</span>}
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="text-xl pb-1">Contest description</label>
                    <textarea className="rounded-md p-2 resize-none" placeholder="Enter your contest description." rows={8} type="text" {...register("description", { required: true })}></textarea>
                    {errors.description && <span className="text-red-400 py-1">Contest description is required.</span>}
                </div>
                <div className="flex gap-5">
                    <div className="flex flex-col w-1/2">
                        <label className="text-xl pb-1">Registration Fee</label>
                        <input className="p-2 rounded-md" placeholder="Enter contest registration fee." type="number" {...register("contest_fee", { required: true })} id="" />
                        {errors.contest_fee && <span className="text-red-400 py-1">Contest fee is required.</span>}
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label className="text-xl pb-1">Contest prize</label>
                        <input className="p-2 rounded-md " type="text" placeholder="Enter contest prize" {...register("contest_prize", { required: true })} id="" />
                        {errors.contest_prize && <span className="text-red-400 py-1">Contest prize is required.</span>}
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="text-xl pb-1">Contest instructions</label>
                    <textarea className="rounded-md p-2 resize-none" placeholder="Enter contest submit instructions" rows={8} {...register("instruction", { required: true })}></textarea>
                    {errors.instruction && <span className="text-red-400 py-1">Contest instruction is required.</span>}
                </div>
                <div className="flex gap-5">
                    <div className="flex flex-col w-1/2">
                        <label className="text-xl pb-1">Select contest type</label>
                        <select className="p-2 rounded-md " {...register("contest_type", { required: true })}>
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
                        {errors.contest_type && <span className="text-red-400 py-1">Contest contest type is required.</span>}
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label className="text-xl pb-1">Select Registration Last Date</label>
                        <DatePicker className="p-2 rounded-md" required selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                </div>
                <div className="flex justify-end">
                    <input className="bg-[#407bff] text-white rounded-lg p-2 font-semibold hover:cursor-pointer hover:bg-[#2b2b2b] transition duration-300 w-[200px]" type="submit" />
                </div>

            </form>
        </div>
    );
};

export default AddContest;