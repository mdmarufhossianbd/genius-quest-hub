import { createBrowserRouter } from "react-router-dom";
import ContestView from "../Components/Shared/ContestView";
import DashboardLayout from "../Layout/DashboardLayout";
import Root from "../Layout/Root";
import AddContest from "../Pages/AddContest/AddContest";
import Contest from "../Pages/Contest/Contest";
import ContestDetails from "../Pages/ContestDetails/ContestDetails";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import ManageContest from "../Pages/Dashboard/ManageContest/ManageContest";
import ManageUser from "../Pages/Dashboard/ManageUser/ManageUser";
import MyRegisteredContest from "../Pages/Dashboard/MyRegisteredContest/MyRegisteredContest";
import SubmitContestFrom from "../Pages/Dashboard/MyRegisteredContest/SubmitContestFrom";
import Mycontest from "../Pages/Dashboard/Mycontest/Mycontest";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Profile from "../Pages/Dashboard/Profile/Profile";
import MangeContestApplication from "../Pages/Dashboard/RegisteredContest/MangeContestApplication";
import RegisteredContest from "../Pages/Dashboard/RegisteredContest/RegisteredContest";
import UpdateContest from "../Pages/Dashboard/UpdateContest/UpdateContest";
import Home from "../Pages/Home/Home";
import Signin from "../Pages/Signin/Signin";
import Signup from "../Pages/Signup/Signup";
import AdminRoute from "./AdminRoute";
import CreatorRoute from "./CreatorRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/signin',
                element: <Signin></Signin>
            },
            {
                path: '/contest',
                element: <Contest></Contest>
            },
            {
                path: '/contest/details/:id',
                element: <ContestDetails></ContestDetails>,
                loader: ({params})=>fetch(`http://localhost:5000/contests/${params.id}`)
            },
            
            {
                path: '/payment',
                element: <Payment></Payment>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoute><DashboardHome></DashboardHome></PrivateRoute>
            },
            {
                path: '/dashboard/contest-preview/:id',
                element: <PrivateRoute><ContestView></ContestView></PrivateRoute>,
                loader: ({params})=>fetch(`http://localhost:5000/contests/${params.id}`)
            },
            {
                path: '/dashboard/my-registered-contest',
                element: <MyRegisteredContest></MyRegisteredContest>
            },
            {
                path: '/dashboard/contest-submision/:id',
                element: <SubmitContestFrom></SubmitContestFrom>,
                // loader: ({params})=>fetch(`http://localhost:5000/registered-contests/${params.id}`)
            },
            // creator
            {
                path: '/dashboard/add-contest',
                element: <CreatorRoute><AddContest></AddContest></CreatorRoute>
            },
            {
                path: '/dashboard/my-contest',
                element: <CreatorRoute><Mycontest></Mycontest></CreatorRoute>
            },
            {
                path: '/dashboard/update-contest/:id',
                element: <CreatorRoute><UpdateContest></UpdateContest></CreatorRoute>,
                loader: ({params})=>fetch(`http://localhost:5000/contests/${params.id}`)
            },
            {
                path: '/dashboard/registered-contest',
                element: <CreatorRoute><RegisteredContest></RegisteredContest></CreatorRoute>
            },
            {
                path: '/dashboard/mange-contest-application/:id',
                element: <CreatorRoute><MangeContestApplication></MangeContestApplication></CreatorRoute>,
                loader: ({params})=>fetch(`http://localhost:5000/registered-contests/${params.id}`)
            },
            // admin
            {
                path: '/dashboard/manage-user',
                element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
            },
            {
                path: '/dashboard/manage-contest',
                element: <AdminRoute><ManageContest></ManageContest></AdminRoute>
            },
            {
                path: '/dashboard/profile',
                element: <Profile></Profile>
            },
            // user
            
        ]
    }
]);

export default router