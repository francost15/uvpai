import { Outlet } from "react-router-dom";
import { menuRoutes } from "../router/router";
import { SidebarMenuItem } from "../components";

export const DashboardLayout = () => {
    return (
        <main className="flex flex-row ">
        <nav className="hidden sm:flex flex-col " style={{ backgroundColor: 'rgb(51, 0, 68)', padding: '1.25rem' }}>
        <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white bg-clip-text text-transparent">
        ENGI AI
        </h1>
            {/* Aqui puede ir el logo */}
        <div className="border-purple-400 border my-3" />

        {/* Opciones del menú */}
        {
            menuRoutes.map(option => (
                <SidebarMenuItem key={option.to}{...option} />
            ))
        }
        
        </nav>

        <section className="mx-3 sm:mx-20 flex flex-col w-full h-[calc(100vh-50px)]  bg-white bg-opacity-10 p-5 rounded-3xl">
            <div className="flex flex-row h-full">
                <div className="flex flex-col flex-auto h-full p-1">
                    <Outlet />
                </div>
            </div>
        </section>
    </main>
  );
};
