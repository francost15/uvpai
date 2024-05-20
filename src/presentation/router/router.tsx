import { Navigate, createBrowserRouter } from "react-router-dom";
import { AssistantPage
    , NotFoundPage
    } from "../pages";

export const menuRoutes = [
    {
        to: "uvp",
        icon: "fa-brands fa-js",
        title: "uvp",
        description: "   ",
        component: <AssistantPage />
    },
];

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/asistentes/uvp" />,
    },
    {
        path: '*',
        element: <NotFoundPage/>
    },
    {
        path: "/asistentes",
        children: [
            ...menuRoutes.map(route => ({
                path: route.to,
                element: route.component
            })),
            {
                path: '*',
                element: <NotFoundPage/>
            }
        ],
    }
])