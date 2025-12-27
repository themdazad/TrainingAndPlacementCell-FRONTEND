import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PATHS } from "./paths.js";
import PrivateRoute from "../components/auth/PrivateRoute.jsx";
import StudentDashboard from "../pages/(dashboard)/student";

// Lazy load pages
const Home = lazy(() => import("../pages/home"));
const AboutUs = lazy(() => import("../pages/about/index.jsx"));
const Alumni = lazy(() => import("../pages/alumni/index.jsx"));
const Gallery = lazy(() => import("../pages/gallery/index.jsx"));
const Auth = lazy(() => import("../pages/auth/index.jsx"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* 🌐 Public Routes with Main Layout */}
        <Route path={PATHS.HOME} element={<Home />} />
        <Route path={PATHS.ABOUT_US} element={<AboutUs />} />
        <Route path={PATHS.ALUMNI} element={<Alumni />} />
        <Route path={PATHS.GALLERY} element={<Gallery />} />
        <Route path={PATHS.AUTH} element={<Auth />} />

        {/* Auth Routes */}
        {/* <Route path={PATHS.LOGIN} element={<Login />} /> */}

        {/* 🔒 Protected Routes */}
        <Route
          path="/(dashboard)/student"
          element={
            <PrivateRoute>
              <StudentDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
