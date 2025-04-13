import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useContext } from "react";

// auth Pages
import Careers from "./pages/careers/careers.jsx";
import AdminLogin from "./pages/auth/admin/login.jsx";
import AdminRegister from "./pages/auth/admin/register.jsx";
import StudentLogin from "./pages/auth/student/login.jsx";
import StudentRegister from "./pages/auth/student/register.jsx";
import Programs from "./pages/programs-page/Programs.jsx";
import Layout, { FAQ } from "./layout";

import Contact from "./pages/contact-page/contact.jsx";
import AdminDashboard from "./pages/dashboard/admin";
import StudentDashboard from "./pages/dashboard/student";
import AuthContext from "./contexts/auth/AuthContext.jsx";
import Gallery from "./pages/gallery/index.jsx";

// Private Route
import PrivateRoute from "./components/auth/PrivateRoute.jsx";

export default function Path() {
  const [isLogedIn, setAuth] = useState(useContext(AuthContext));
  return (
    <Routes>
      {/* Top-Level Routes | PUBLIC  */}
      <Route path="/" element={<Layout />} />
      <Route path="/">
        <Route path="programs" element={<Programs />} />
        <Route path="careers" element={<Careers />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
      </Route>

      {/* auth | ADMIN + STUDENT */}
      <Route path="/auth">
        <Route path="admin">
          <Route path="login" element={<AdminLogin />}></Route>
          <Route path="register" element={<AdminRegister />}></Route>
        </Route>

        <Route path="student">
          <Route path="login" element={<StudentLogin />}></Route>
          <Route path="register" element={<StudentRegister />}></Route>
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
    </Routes>
  );
}
