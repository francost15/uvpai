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
      <main className="flex flex-row h-screen">
        <nav
          className={`transition-all duration-200 ${
            isSidebarVisible ? "sm:flex" : "hidden"
          } flex-col items-center h-full shadow-lg`}
          style={{ backgroundColor: "rgb(188, 121, 242)", padding: "1.25rem" }}
        >
          <button className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white bg-clip-text text-transparent mb-5">
            <img
              src="src/assets/engilogo.png"
              alt="Logo"
              className="w-28 h-28 mb-2"
            />
            ENGI AI
          </button>

          {/* Aqui puede ir el logo */}
          <div className="border-purple-400 border my-5" />

          {/* Opciones del menú */}
          {menuRoutes.map((option) => (
            <SidebarMenuItem key={option.to} {...option} />
          ))}
        </nav>

        <button
          onClick={toggleSidebar}
          className={`p-2 bg-white text-purple-600 rounded-full shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 transition-colors duration-200 fixed top-[50%] ${
            isSidebarVisible ? "left-[calc(14%-1.75rem)]" : "left-0"
          } transform -translate-y-1/2`}
          style={{ marginLeft: "1rem" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            {isSidebarVisible ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

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