import { ChevronDown, CircleHelp, User, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/Slice/auth/LoginSlice";
import { useSidebar } from "./SidebarContext";
const DashbordHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/");
    };

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const { data } = useSelector((state) => state.LoginAPI);

    return (
        
           <div className="w-full">
            <header className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white border-b z-50 drop-shadow-md">
                {/* Sidebar Toggle Button */}
                <button
                    className="lg:hidden focus:outline-none"
                    onClick={toggleSidebar}
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <h1 className="text-xl font-bold">{data[0]?.user?.name}</h1>

                {/* Profile Dropdown */}
                <div className="flex gap-5 relative">
                    <div className="relative inline-block text-left">
                        <button
                            onClick={toggleDropdown}
                            className="text-black font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                            type="button"
                        >
                            <User />
                            <ChevronDown className="w-4 h-4 ml-2" />
                        </button>

                        {isOpen && (
                            <div className="absolute right-0 z-50 mt-2 w-44 bg-white rounded-lg shadow-lg divide-y divide-gray-100">
                                <ul className="py-2 text-sm text-gray-700">
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Sign out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        
        </div>
    );
};

export default DashbordHeader;
