import { Routes, Route } from "react-router-dom";

// auth Pages
import Careers from "./pages/careers/careers.jsx";
import AdminLogin from "./pages/auth/admin/login.jsx";
import AdminRegister from "./pages/auth/admin/register.jsx";
import StudentLogin from "./pages/auth/student/login.jsx";
import StudentRegister from "./pages/auth/student/register.jsx";
import Programs from "./pages/programs-page/Programs.jsx";
import Layout, { FAQ } from "./layout";

import Contact from "./pages/contact-page/contact.jsx";
import AdminDashboard from "./pages/dashboard/admin/admin-dashboard.jsx";
import StudentDashboard from "./pages/dashboard/student/student-dashboard.jsx";

export default function Path() {
  return (
    <Routes>
      {/* Top-Level Routes | PUBLIC  */}
      <Route path="/" element={<Layout />} />
      <Route path="/">
        <Route path="programs" element={<Programs />} />
        <Route path="careers" element={<Careers />} />
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
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="student" element={<StudentDashboard />} />
      </Route>
    </Routes>
  );
}
