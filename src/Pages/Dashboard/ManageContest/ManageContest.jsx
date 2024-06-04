import toast, { Toaster } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useContest from "../../../Hooks/useContest";

const ManageContest = () => {
    const [contests, isLoading, refetch] = useContest();
    const axiosSecure = useAxiosSecure()

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className=" loading loading-dots loading-lg"></span>
        </div>
    }

    // contest delete
    const handleDelete = contest => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // contest delete from database
                axiosSecure.delete(`/contests/${contest._id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }

    // contest comment
    const handleComment = (event, contest) => {       
        const comment = event.target.comment.value;
        const comments = {comment, contest}
        axiosSecure.post('/comments', comments)
           .then((res) => {
                if (res.data.insertedId) {
                    toast.success('Your comment send successfully');
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    // publish contest
    const handleContestPublish = contest => {        
        axiosSecure.patch(`/contests/${contest.contest._id}`)
        .then(res=>{            
            if(res.data.modifiedCount > 0){
                toast.success('This contest is publish successfully');
                refetch()
            }
        })
    }

    return (
        <div>
            <h2>Total Conteste {contests.length}</h2>
            <table className="table">
                {/* head */}
                <thead>
                    <tr className="bg-[#407BFF] text-white font-semibold text-lg">
                        <th></th>
                        <th>Contest Name</th>
                        <th>Creator</th>
                        <th>Contest Status</th>
                        <th>Comment</th>
                        <th>View</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {/* body */}
                <tbody>
                    {
                        contests.map((contest, index) => <tr className="hover" key={contest._id}>
                            <th>{index + 1}</th>
                            <td>{contest.contestName}</td>
                            <td>{contest?.creatorEmail}</td>
                            <td>
                                {contest.contestStatus === 'pending' ? <button onClick={()=>handleContestPublish({contest})}>Confirm Publish</button> : "Publish"}
                            </td>
                            <td>
                                <button className="" onClick={() => document.getElementById('my_modal_3').showModal()}>Comment</button>
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg pb-2">{contest.contestName}</h3>
                                        <form  onSubmit={() => handleComment(event, { contest })} method="dialog">                                            
                                            <textarea className="w-full border rounded-md my-2 p-4" rows={5} name="comment" placeholder="Enter your comment" required></textarea>
                                            <input className="btn btn-sm hover:bg-[#407BFF] hover:text-white" type="submit" value="Comment" />
                                        </form>
                                        <p className="py-4 text-center">Press ESC key to close</p>
                                    </div>
                                </dialog>
                            </td>
                            <td>
                            <Link to={`/dashboard/contest-preview/${contest._id}`}><button>View</button></Link>
                            </td>
                            <td><button onClick={() => handleDelete(contest)}><FaTrashAlt className="text-red-500 ml-5" /></button></td>
                        </tr>)
                    }
                </tbody>
            </table>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default ManageContest;