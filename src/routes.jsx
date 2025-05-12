import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useContext } from "react";

import Layout from "./layout.jsx";
// auth Pages
import AdminLogin from "./pages/auth/admin/login.jsx";
import AdminRegister from "./pages/auth/admin/register.jsx";
import StudentLogin from "./pages/auth/student/login.jsx";
import StudentRegister from "./pages/auth/student/register.jsx";
import ForgotPassword from "./pages/auth/student/forgot-password.jsx";

import AdminDashboard from "./pages/dashboard/admin";
import StudentDashboard from "./pages/dashboard/student";
import AuthContext from "./contexts/auth/AuthContext.jsx";
import ReachSiwan from "./pages/common/reach-siwan.jsx";
// fallback routes
import ComingSoon from "./pages/ComingSoon.jsx";
// Private Route
import PrivateRoute from "./components/auth/PrivateRoute.jsx";
// Public Routes 
import ContactUs from "./pages/contact-us/index.jsx";
import Programs from "./pages/programs-page/index.jsx";
import CampusPlacements2025 from "./pages/campus-placement/2025/campus-placement-2025.jsx"
import Projects from "./pages/projects/index.jsx";
import ProjectDetailsPage from "./pages/projects/projectDetailsPage.jsx";
import ScrollToTop from "./utils/ScrollToTop.jsx"

export default function Path() {
  const [isLogedIn, setAuth] = useState(useContext(AuthContext));
  const location = useLocation(); // Get the current location

  return (
    <Routes>
      {/* ScrollToTop component will now trigger on route change */}
      ScrollToTop();
      {/* Top-Level Routes | PUBLIC */}
      <Route path="/" element={<Layout />} />
      {/* auth | ADMIN + STUDENT */}
      <Route path="/auth">
        <Route path="admin">
          <Route path="login" element={<AdminLogin />} />
          <Route path="register" element={<AdminRegister />} />
        </Route>

        <Route path="student">
          <Route path="login" element={<StudentLogin />} />
          <Route path="register" element={<StudentRegister />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
      </Route>
      {/* Dashboard | ADMIN + STUDENT */}
      <Route path="/dashboard">
        <Route
          path="admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="student"
          element={
            <PrivateRoute>
              <StudentDashboard />
            </PrivateRoute>
          }
        />
      </Route>
      {/* Public Routes  */}
      <Route path="reach-siwan" element={<ReachSiwan />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="programs" element={<Programs />} />
      {/* resources */}
      <Route path="/projects">
        <Route index element={<Projects />} />
        {/* Nested Route for Project Details */}
        <Route path=":title/:id" element={<ProjectDetailsPage />} />
      </Route>
      <Route path="campus-placement-2025" element={<CampusPlacements2025 />} />
      {/* Catch-all fallback for unmatched routes */}
      <Route path="*" element={<ComingSoon />} />
    </Routes>
  );
}