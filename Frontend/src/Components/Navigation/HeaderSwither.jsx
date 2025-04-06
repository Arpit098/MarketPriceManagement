import React from "react";
import { useLocation } from "react-router-dom";
import DashbordHeader from "./DashbordHeader";
import Siteheader from "./SiteHeader";

const HeaderSwither = () => {
  const location = useLocation();

  // Check if the current route is for admin or subscriber
  const isAdminOrSubscriberRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/subscriber") ||
    location.pathname.startsWith("/consultant");

  return isAdminOrSubscriberRoute ? <DashbordHeader /> : <Siteheader />;
};

export default HeaderSwither;
