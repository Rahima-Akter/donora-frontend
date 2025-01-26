import React, { useState } from "react";
import DashNavbar from "../components/DashNavbar";
import { Outlet } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import ThemeToggleButton from "../../../contexts/ThemeProvider/ThemeToggleButton";

const DashboardLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="lg:flex lg:flex-row min-h-screen  dark:bg-gray-900 flex-grow">
            <div className="z-50 relative">
                <button
                    onClick={toggleSidebar}
                    className="text-2xl text-Red dark:text-gray-200 lg:hidden"
                >
                    {!isSidebarOpen ? <AiOutlineMenu className="absolute top-4 left-4 z-20" /> : <AiOutlineClose className="absolute top-5 md:right-[63%] sm:right-[45%] right-[38%] z-50" />}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`lg:w-[25%] md:w-[40%] w-64 fixed lg:static bg-white dark:bg-gray-900 border-r dark:border-gray-700 transform transition-transform duration-300 top-0 left-0 h-full ${isSidebarOpen ? "translate-x-0 z-40" : "-translate-x-full z-40"} lg:translate-x-0`}
            >
                <DashNavbar />
            </div>

            {/* Main Content */}
            <div className="lg:w-[75%] w-full h-full min-h-screen overflow-auto ml-auto z-30 lg:static absolute top-16 right-0 left-0 bg-gray-100 dark:bg-gray-900">
                <Outlet />
            </div>
            <ThemeToggleButton />
        </div>
    );
};

export default DashboardLayout;
