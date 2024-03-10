import { Navigate, createBrowserRouter } from "react-router-dom";
import { AssistantPage, AudioToTextPage, ImageGenerationPage,
    ImageTunningPage, OrthographyPage, ProsConsPage, 
    ProsConsStreamPage, TextToAudioPage, TranslatePage } from "../pages";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const menuRoutes = [
    {
        to: "/orthography",
        icon: "fa-brands fa-js",
        title: "Javascript",
        description: "   ",
        component: <OrthographyPage />
    },
    {
        to: "/pros-cons",
        icon: "fa-brands fa-python",
        title: "Python",
        description: "",
        component: <ProsConsPage />
    },
    {
        to: "/pros-cons-stream",
        icon: "fa-brands fa-c",
        title: "C",
        description: "",
        component: <ProsConsStreamPage />
    },
    {
        to: "/translate",
        icon: "fa-brands fa-c",
        title: "C++",
        description: "",
        component: <TranslatePage />
    },
    {
        to: "/text-to-audio",
        icon: "fa-brands fa-c",
        title: "C#",
        description: "",
        component: <TextToAudioPage />
    },
    {
        to: "/audio-to-text",
        icon: "fa-brands fa-java",
        title: "Java",
        description: "",
        component: <AudioToTextPage />
    },
    {
        to: "/image-generation",
        icon: "fa-brands fa-rust",
        title: "Rust",
        description: "",
        component: <ImageGenerationPage />
    },
    {
        to: "/image-tunning",
        icon: "fa-brands fa-flutter",
        title: "Flutter",
        description: "",
        component: <ImageTunningPage />
    },
    {
        to: "/assistant",
        icon: "fa-brands fa-perl",
        title: "Perl",
        description: "",
        component: <AssistantPage />
    },
    {
        to: "/assistant",
        icon: "fa-brands fa-perl",
        title: "Angular",
        description: "",
        component: <AssistantPage />
    },
    {
        to: "/assistant",
        icon: "<FaReact/>",
        title: "React",
        description: "",
        component: <AssistantPage />
    },
    {
        
        to: "/assistant",
        icon: "ViFileTypeVue",
        title: "Vue",
        description: "",
        component: <AssistantPage />
    },
];
    export const router = createBrowserRouter([
    {
    path: "/",
    element: <DashboardLayout/>,
        children: [
            ...menuRoutes.map(route => ({
                path: route.to,
                element: route.component
            })),
            {
                path: '',
                element: <Navigate to={menuRoutes[0].to}/>
            }
        ],
    }
])