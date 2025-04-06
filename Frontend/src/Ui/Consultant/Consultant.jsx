import React from "react";
import { Outlet } from "react-router-dom";
import ConsultantTabs from "../../Components/Navigation/Consultant/CousultantTabs";
import { useSidebar } from "../../Components/Navigation/SidebarContext";

const Consultant = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header - Assuming it exists elsewhere with fixed height */}
      <div className="flex flex-1 flex-col h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside
          className={`fixed top-20 left-0 w-[250px] h-[calc(100vh-64px)] bg-gray-800 border-r-2 transition-transform duration-300 transform drop-shadow-xl z-50 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <nav className="h-full w-full flex flex-col overflow-y-auto no-scrollbar px-3">
            <ConsultantTabs />
          </nav>
        </aside>

        {/* Main content wrapper */}
        <div className="flex-1 w-full flex flex-col md:pl-[250px]">
          {/* Outlet wrapper */}
          <div className="flex-1 mt-16 p-4 lg:p-8 overflow-y-auto">
            <Outlet />
          </div>

          {/* Footer */}
          <footer className="w-full bg-white shadow-md">
            <div className="p-4">
              <p className="text-[20px] font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, assumenda!
              </p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Consultant;