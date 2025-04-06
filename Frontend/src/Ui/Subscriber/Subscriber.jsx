import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SubscriberTabs from "../../Components/Navigation/Subscriber/SubscriberTabs";
import { useSidebar } from "../../Components/Navigation/SidebarContext";

const Subscriber = () => {
  const { isSidebarOpen } = useSidebar();

  // Debug layout and scrolling
  useEffect(() => {
    const checkLayout = () => {
      // console.log("Viewport Width:", window.innerWidth);
      // console.log("Viewport Height:", window.innerHeight);
      // console.log("Document Height:", document.body.scrollHeight);
      const header = document.querySelector("header");
      const sidebar = document.querySelector("aside");
      const outletWrapper = document.querySelector(".outlet-wrapper");
      const mainContent = document.querySelector(".main-content");
      const root = document.querySelector("#root");
      // if (header) {
      //   console.log("Header Height:", header.offsetHeight);
      //   console.log("Header Position:", window.getComputedStyle(header).position);
      // }
      // if (sidebar) {
      //   console.log("Sidebar Width:", sidebar.offsetWidth);
      //   console.log("Sidebar Display:", window.getComputedStyle(sidebar).display);
      // }
      // if (outletWrapper) {
      //   console.log("Outlet Wrapper Height:", outletWrapper.offsetHeight);
      //   console.log("Outlet Content Height:", outletWrapper.scrollHeight);
      // }
      // if (mainContent) {
      //   console.log("Main Content Height:", mainContent.offsetHeight);
      // }
      // if (root) {
      //   console.log("Root Height:", root.offsetHeight);
      //   console.log("Root Overflow:", window.getComputedStyle(root).overflow);
      // }
    };
    checkLayout();
    const timer = setTimeout(checkLayout, 1000); // Recheck after render
    window.addEventListener("resize", checkLayout);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkLayout);
    };
  }, []);

  return (
    <main className="w-full flex flex-col h-screen">
      {/* Entire layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Toggleable on small and medium screens, fixed on large */}
        <aside
          className={`fixed top-16 left-0 w-64 bg-white border-r-2 z-50 h-[calc(100vh-64px)] 
            transition-transform duration-300 transform 
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            lg:translate-x-0`}
        >
          <div className="h-full overflow-y-auto">
            <nav className="h-full w-full px-3">
              <SubscriberTabs className="h-full" />
            </nav>
          </div>
        </aside>

        {/* Main content wrapper */}
        <div
          className={`flex-1 px-2 sm:px-4 w-full transition-all duration-300 ${
            isSidebarOpen ? "ml-0 lg:ml-64" : "ml-0 lg:ml-64"
          } flex flex-col main-content`}
        >
          {/* Overlay for mobile and medium screens when sidebar is open */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => {}} // Placeholder; add toggle logic if needed
            />
          )}

          {/* Outlet with scroll */}
          <div
            className="mt-4 flex-1 max-w-screen-lg overflow-y-auto pt-16 outlet-wrapper"
            style={{ height: "calc(100vh - 80px)" }} // 64px header + 16px mt-4
          >
            <Outlet />
          </div>

          {/* Footer with fixed height */}
          <footer className="w-full bg-white shadow-md text-center border-t h-16 shrink-0 flex items-center justify-center">
            <p className="text-sm md:text-lg font-bold px-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Subscriber;