import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./auth";
import { ProtectedRoute } from "./protectedRoutes";
import CreatorDataProvider from "./creatorData";
import LoginPage from "./login";
import MapPage from "./mapPage";
import UserHomePage from "./userHomePage";
import CreatorPage from "./creatorPage";
import React from 'react'

function Routes() {
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
        element: <CreatorDataProvider><ProtectedRoute/></CreatorDataProvider>,
        children: [
            {
                path:"/profile",
                element: <UserHomePage/>
            },
            {
                path:"/create",
                element: <CreatorPage/>
            },
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