import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCreatorContest from "../../../Hooks/useCreatorContest";

const Mycontest = () => {
    const [myContests, isLoading, refetch] = useCreatorContest();
    const axiosSecure = useAxiosSecure();

    const { data: comments = [], isLoading: loading } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/comments');
            return res.data;
        }
    })

    if (isLoading || loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className=" loading loading-dots loading-lg"></span>
        </div>
    }

    // comment show
    const handleCommentShow = contest => {
        const matchedComment = comments.filter(item => {
            if (item?.contestId === contest._id) {
                return true
            }
        })
        if (matchedComment.length === 0) {
            toast.success('Not found any comment for this contest')
        } else {
            matchedComment.map(item => Swal.fire({
                title: "Message for you",
                text: item.comment,    
              }) )
        }

    }


    // delete contest
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

    return (
        <div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr className="bg-[#407BFF] text-white font-semibold text-lg">
                        <th></th>
                        <th>Name</th>
                        <th>Creator</th>
                        <th>Contest Status</th>
                        <th>Admin Comment</th>
                        <th>View</th>
                        <th>Update</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {/* body */}
                <tbody>
                    {
                        myContests.map((contest, index) => <tr className="hover" key={contest._id}>
                            <th>{index + 1}</th>
                            <td>{contest.contestName}</td>
                            <td>{contest?.creatorName}</td>
                            <td>{contest.contestStatus}</td>
                            <td><button onClick={() => handleCommentShow(contest)}>Comment</button></td>
                            <td>
                                <Link to={`/dashboard/contest-preview/${contest._id}`}><button>View</button></Link>
                            </td>
                            <td><Link to={`/dashboard/update-contest/${contest._id}`}><button>Edit</button></Link></td>
                            <td><button onClick={() => handleDelete(contest)} className="ml-5"><FaTrashAlt className="text-red-500" /></button></td>
                        </tr>)
                    }
                </tbody>
            </table>
            {myContests.length === 0 ? <h2 className="py-10 text-center">You have not add any contest. <Link to={'/dashboard/add-contest'} className="btn btn-sm">Add Contest</Link> </h2> : ""}
            <Toaster
                position="top-center"
                FreverseOrder={false}
            />
        </div>
    );
};

export default Mycontest;