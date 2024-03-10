import { useState } from 'react';
import { Outlet } from "react-router-dom";
import { menuRoutes } from "../router/router";
import { SidebarMenuItem } from "../components";

export const DashboardLayout = () => {
    const [isSidebarVisible, setSidebarVisibility] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisibility(!isSidebarVisible);
    };

    return (
        <main className="flex flex-row ">
        <nav className={`transition-all duration-200 ${isSidebarVisible ? 'sm:flex' : 'hidden'} flex-col `} style={{ backgroundColor: 'rgb(188, 121, 242)', padding: '1.25rem' }}>
        <button className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white bg-clip-text text-transparent">
        ENGI AI
        </button>
            {/* Aqui puede ir el logo */}
        <div className="border-purple-400 border my-5" />

        {/* Opciones del menú */}
        {
            menuRoutes.map(option => (
                <SidebarMenuItem key={option.to}{...option} />
            ))
        }
        
        </nav>

        <button onClick={toggleSidebar} className="p-1 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 focus:outline-none  focus:ring-purple-600 focus:ring-opacity-50 transition-colors duration-200">x</button>

        <section className="mx-3 sm:mx-20 flex flex-col w-full h-[calc(100vh-50px)] rounded-3xl">
            <div className="flex flex-row h-full">
                <div className="flex flex-col flex-auto h-full ">
                    <Outlet />
                </div>
            </div>
        </section>
    </main>
  );
};