import useUsers from "../../../Hooks/useUsers";

const Profile = () => {
    const [users, userLoading] = useUsers();    
    console.log(users);
    
    if(userLoading){
        return <div className="flex justify-center items-center min-h-screen">
        <span className=" loading loading-dots loading-lg"></span>
    </div>
    }
    
     
    return (
        <div>
            This is profile page. {users?.name}. Your Role is {users?.role} and your account status is now {users?.status}            
        </div>
    );
};

export default Profile;