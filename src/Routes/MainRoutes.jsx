import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Root from "../Layout/Root";
import AddContest from "../Pages/AddContest/AddContest";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import Home from "../Pages/Home/Home";
import Signin from "../Pages/Signin/Signin";
import Signup from "../Pages/Signup/Signup";

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
                element: <DashboardHome></DashboardHome>
            },
            {
                path: '/dashboard/add-contest',
                element: <AddContest></AddContest>
            }
        ]
    }
]);

export default router