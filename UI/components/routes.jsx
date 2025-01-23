import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./auth";
import { ProtectedRoute } from "./protectedRoutes";
import LoginPage from "./login";
import MapPage from "./mapPage";
import React from 'react'

const Routes = () => {
    const { token } = useAuth();

    //routes for all users
    const publicRoutes = [
        {
            path: "/",
            element: <h1>Home page?</h1>
        },
        {
            path: "/map",
            element: <MapPage/>
        },
        {
            path: "/login",
            element: <LoginPage/>
        }
    ];

    //routes for only authenticated users
    const authenticatedRoutes = [{
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path:"/profile",
                element:<div>Proflie page</div>
            }
        ]
    }]

    //setting up the router
    const router = createBrowserRouter([
        ...publicRoutes,
        ...authenticatedRoutes
    ])

    return <RouterProvider router={router}/>
}

export default Routes