import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Root from "../Layout/Root";
import AddContest from "../Pages/AddContest/AddContest";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import ManageContest from "../Pages/Dashboard/ManageContest/ManageContest";
import ManageUser from "../Pages/Dashboard/ManageUser/ManageUser";
import Home from "../Pages/Home/Home";
import Signin from "../Pages/Signin/Signin";
import Signup from "../Pages/Signup/Signup";
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
                path: '/dashboard/add-contest',
                element: <PrivateRoute><AddContest></AddContest></PrivateRoute>
            },
            {
                path: '/dashboard/manage-user',
                element: <PrivateRoute><ManageUser></ManageUser></PrivateRoute>
            },
            {
                path: '/dashboard/manage-contest',
                element: <ManageContest></ManageContest>
            }
        ]
    }
]);

export default router