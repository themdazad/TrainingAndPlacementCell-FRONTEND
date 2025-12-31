import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PATHS from "../constants/paths.js";
// Layouts
import MainLayout from "../layouts/MainLayout.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";

// Lazy load pages
const Home = lazy(() => import("../pages/home"));
const AboutUs = lazy(() => import("../pages/about/index.jsx"));
const Alumni = lazy(() => import("../pages/alumni/index.jsx"));
const Gallery = lazy(() => import("../pages/gallery/index.jsx"));
const Login = lazy(() => import("../pages/auth/components/Login.jsx"));
const Signup = lazy(() => import("../pages/auth/components/Signup.jsx"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* 🌐 Public Routes with Main Layout */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={PATHS.MAIN.ABOUT_US} element={<AboutUs />} />
          <Route path={PATHS.MAIN.ALUMNI} element={<Alumni />} />
          <Route path={PATHS.MAIN.GALLERY} element={<Gallery />} />
        </Route>

      <Route element={<AuthLayout />}>
        {/* Auth Routes */}
        <Route path={PATHS.AUTH.LOGIN} element={<Login />} />
        <Route path={PATHS.AUTH.SIGNUP} element={<Signup />} />
      </Route>
        {/* 🔒 Protected Routes */}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
