import { Navigate, createBrowserRouter } from "react-router-dom";
import { AssistantPage, AudioToTextPage, ImageGenerationPage,
    OrthographyPage, ProsConsPage, NotFoundPage, MainPage
    } from "../pages";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const menuRoutes = [
    {
        to: "orthography",
        icon: "fa-brands fa-js",
        title: "Javascript",
        description: "   ",
        component: <OrthographyPage />
    },
    {
        to: "pros-cons",
        icon: "fa-brands fa-python",
        title: "Python",
        description: "",
        component: <ProsConsPage />
    },
    {
        to: "text-to-audio",
        icon: "fa-brands fa-c",
        title: "C#",
        description: "",
        component: <AssistantPage />
    },
    {
        to: "audio-to-text",
        icon: "fa-brands fa-java",
        title: "Java",
        description: "",
        component: <AudioToTextPage />
    },
    {
        to: "image-generation",
        icon: "fa-brands fa-rust",
        title: "Rust",
        description: "",
        component: <ImageGenerationPage />
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
        path: "/bots",
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