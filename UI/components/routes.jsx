import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoutes";
import CreatorDataProvider from "./creatorData";
import { PostEditorProvider } from "./postEditorContext";
import LoginPage from "./login";
import MapPage from "./mapPage";
import HomePage from "./homePage";
import UserHomePage from "./userHomePage";
import MakeNewPostPage from "./makeNewPost";
import CreatorPage from "./creatorPage";
import SignupPage from "./signup";
import Navbar from "./navbar";
import React from 'react'

function Routes() {

    //routes for all users
    const publicRoutes = [
        {
            path: "/",
            element: <>
                <Navbar/>
                <HomePage/>
            </>
        },
        {
            path: "/map",
            element: <div className="fullPage">
                <Navbar/>
                <MapPage/>
            </div>
        },
        {
            path: "/login",
            element: <>
                <Navbar/>
                <LoginPage/>
            </>
        },
        {
            path:"/signup",
            element: <>
                <Navbar/>
                <SignupPage/>
            </>
        }
    ];

    //routes for only authenticated users
    const authenticatedRoutes = [{
        path: "",
        element: <CreatorDataProvider><ProtectedRoute/></CreatorDataProvider>,
        children: [
            {
                path:"/profile",
                element: <>
                    <Navbar/>
                    <UserHomePage/>
                </>
            },
            {
                path:"/create",
                element: <div className="fullPage">
                    <Navbar/>
                    <CreatorPage/>
                </div>
            },
            {
                path:"/createnew",
                element: <>
                    <Navbar/>
                    <PostEditorProvider><MakeNewPostPage/></PostEditorProvider>
                </>
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