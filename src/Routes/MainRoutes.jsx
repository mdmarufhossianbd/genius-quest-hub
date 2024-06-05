import { createBrowserRouter } from "react-router-dom";
import ContestView from "../Components/Shared/ContestView";
import DashboardLayout from "../Layout/DashboardLayout";
import Root from "../Layout/Root";
import AddContest from "../Pages/AddContest/AddContest";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import ManageContest from "../Pages/Dashboard/ManageContest/ManageContest";
import ManageUser from "../Pages/Dashboard/ManageUser/ManageUser";
import Mycontest from "../Pages/Dashboard/Mycontest/Mycontest";
import Profile from "../Pages/Dashboard/Profile/Profile";
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