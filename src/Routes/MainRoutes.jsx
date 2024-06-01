import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import AddContest from "../Pages/AddContest/AddContest";
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
            {
                path: '/add-contest',
                element: <AddContest></AddContest>
            }
        ]
    },
]);

export default router