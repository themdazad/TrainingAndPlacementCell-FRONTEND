import { Routes, Route } from "react-router-dom";
import Home from "../../pages/shared/home";
// auth Pages
import AdminLogin from "../../pages/shared/auth/admin/login.jsx";
import AdminRegister from "../../pages/shared/auth/admin/register.jsx";
import StudentLogin from "../../pages/shared/auth/student/login.jsx";
import StudentRegister from "../../pages/shared/auth/student/register.jsx";
import ForgotPassword from "../../pages/shared/auth/student/forgot-password.jsx";
// Public Routes
import ContactUs from "../../pages/shared/contact-us/index.jsx";
import Programs from "../../pages/shared/programs-page/index.jsx";
import CampusPlacements2025 from "../../pages/shared/campus-placement/2025/campus-placement-2025.jsx";
import Projects from "../../pages/shared/projects";
import CourseHighlights from "../../pages/shared/academics/course-highlights/index.jsx";
import ProjectDetailsPage from "../../pages/shared/projects/project-details-page.jsx";
import ReachUs from "../../pages/shared/reach-us/index.jsx";
import AboutUs from "../../pages/shared/about-us/index.jsx";
import SummerWebDevelopment2025 from "../../pages/shared/training/summer-web-development-2025/index.jsx";
import ResumeBuilderTool from "../../pages/shared/resources/resume-builder/index.jsx";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="programs" element={<Programs />} />
      <Route path="/tools/resume-builder" element={<ResumeBuilderTool />} />
      <Route path="/recruiters/reach-us" element={<ReachUs />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="/academics">
        <Route path="course-highlights" element={<CourseHighlights />} />
      </Route>
      {/* resources */}
      <Route path="/training">
        <Route
          path="summer-web-development-2025"
          element={<SummerWebDevelopment2025 />}
        />
      </Route>
      <Route path="/projects">
        <Route index element={<Projects />} />
        <Route path=":title/:id" element={<ProjectDetailsPage />} />
      </Route>

      <Route path="campus-placement-2025" element={<CampusPlacements2025 />} />
    </Routes>
  );
};
export default AppRoutes;
