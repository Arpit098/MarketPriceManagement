import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    const key = location.pathname;

    const savedPosition = sessionStorage.getItem(key);
    window.scrollTo(0, savedPosition ? parseInt(savedPosition) : 0);

    const handleScroll = () => {
      sessionStorage.setItem(key, window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sessionStorage.removeItem(key);
    };
  }, [location]);

  return null;
};

export default ScrollRestoration;
