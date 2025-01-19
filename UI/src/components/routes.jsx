import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./auth";
import { ProtectedRoute } from "./protectedRoutes";
import LoginPage from "./login";

const Routes = () => {
    const { token } = useAuth();

    //routes for all users
    const publicRoutes = [
        {
            path: "/",
            element: <h1>Homepage</h1>
        },
        {
            path: "/map",
            element: <h1>Map page</h1>
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