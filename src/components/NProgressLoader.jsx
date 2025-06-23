// src/components/NProgressLoader.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

export default function NProgressLoader() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    // Fake delay of 1.5 seconds
    const timer = setTimeout(() => {
      NProgress.done();
    }, 1500);

    return () => {
      clearTimeout(timer);
      NProgress.done(); // Ensure cleanup on unmount
    };
  }, [location]);

  return null;
}
