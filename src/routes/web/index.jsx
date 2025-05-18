import { Routes, Route } from "react-router-dom";
import Layout from "../../layout.jsx";
// auth Pages
import AdminLogin from "../../pages/auth/admin/login.jsx";
import AdminRegister from "../../pages/auth/admin/register.jsx";
import StudentLogin from "../../pages/auth/student/login.jsx";
import StudentRegister from "../../pages/auth/student/register.jsx";
import ForgotPassword from "../../pages/auth/student/forgot-password.jsx";
import ReachSiwan from "../../pages/common/reach-siwan.jsx";
// fallback routes
import ComingSoon from "../../pages/ComingSoon.jsx";
// Public Routes
import ContactUs from "../../pages/contact-us/index.jsx";
import Programs from "../../pages/programs-page/index.jsx";
import CampusPlacements2025 from "../../pages/campus-placement/2025/campus-placement-2025.jsx";
import Projects from "../../pages/projects/index.jsx";
import CourseHighlights from "../../pages/academics/course-highlights/index.jsx";
import ProjectDetailsPage from "../../pages/projects/projectDetailsPage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
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

      {/* Public Routes  */}
      <Route path="reach-siwan" element={<ReachSiwan />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="programs" element={<Programs />} />
      <Route path="/academics">
        <Route path="course-highlights" element={<CourseHighlights />} />
      </Route>
      {/* resources */}
      <Route path="/projects">
        <Route index element={<Projects />} />
        <Route path=":title/:id" element={<ProjectDetailsPage />} />
      </Route>
      <Route path="campus-placement-2025" element={<CampusPlacements2025 />} />
      {/* Catch-all fallback for unmatched routes */}
      <Route path="*" element={<ComingSoon />} />
    </Routes>
  );
};
export default AppRoutes;
