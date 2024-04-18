import { Navigate, createBrowserRouter } from "react-router-dom";
import { AssistantPage
    , NotFoundPage, MainPage,
    AssistantPageJava,
    AssistantPagePython,
    AssistantPageC
    } from "../pages";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const menuRoutes = [
    {
        to: "javascript",
        icon: "fa-brands fa-js",
        title: "Javascript",
        description: "   ",
        component: <AssistantPage />
    },
    {
        to: "java",
        icon: "fa-brands fa-java",
        title: "Java",
        description: "   ",
        component: <AssistantPageJava />
    },
    {
        to: "python",
        icon: "fa-brands fa-python",
        title: "Python",
        description: "   ",
        component: <AssistantPagePython />
    },
    {
        to: "c",
        icon: "fa-brands fa-c",
        title: "C",
        description: "   ",
        component: <AssistantPageC />
    },

];

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/main" />,
    },
    {
        path: "main",
        element: <MainPage />,
    },
    {
        path: '*',
        element: <NotFoundPage/>
    },
    {
        path: "/asistentes",
        element: <DashboardLayout/>,
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