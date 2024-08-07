import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();

    // all user
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })

    // user delete
    const handleDelete = user => {
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
                // User delete from database
                axiosSecure.delete(`/users/${user._id}`)
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

    // make creator
    const handleCreator = user => {
        axiosSecure.patch(`/users/creators/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    toast.success('WOW! Creator making done')
                    refetch()
                }
            })
    }

    // block user
    const handleBlockUser = user => {
        axiosSecure.patch(`/users/block/${user._id}`)
            .then(res => {                
                if (res.data.modifiedCount > 0) {
                    toast.success('This user blocked now')
                    refetch();
                }
            })
    }
    // Unblock user
    const handleUnBlockUser = user => {
        axiosSecure.patch(`/users/unblock/${user._id}`)
            .then(res => {                
                if (res.data.modifiedCount > 0) {
                    toast.success('This user blocked now')
                    refetch();
                }
            })
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-[#407BFF] text-white font-semibold text-lg">
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>User Role</th>
                            <th>User Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* body */}
                    <tbody>
                        {
                            users.map((user, index) => <tr className="hover" key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                
                                <td>
                                    {user.role ? user.role : <button onClick={() => handleCreator(user)}>Make Creator</button>}
                                </td>
                                <td>
                                    {user.status === 'block' ? <button onClick={() => handleUnBlockUser(user)} >Unblock</button> : <button onClick={() => handleBlockUser(user)} >Block</button>}
                                </td>
                                <td><button onClick={() => handleDelete(user)}><FaTrashAlt className="ml-5 text-red-500" /></button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
                {
                    users.length === 0 ? <p className="text-center py-10">You have not any user.</p> : ""
                }
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default ManageUser;