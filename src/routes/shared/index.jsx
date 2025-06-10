import { Routes, Route } from "react-router-dom";
import Home from "../../pages/shared/home";
// auth Pages
import Auth from "../../pages/shared/auth/index.jsx";
// Public Routes
import CampusPlacements2025 from "../../pages/shared/campus-placement/2025/campus-placement-2025.jsx";
import Projects from "../../pages/shared/projects";
import CourseHighlights from "../../pages/shared/academics/course-highlights/index.jsx";
import ProjectDetailsPage from "../../pages/shared/projects/project-details-page.jsx";
import ReachUs from "../../pages/recruiters/reach-us/index.jsx";
import WhyUs from "../../pages/recruiters/why-us/index.jsx";
import MediaGlance from "../../pages/recruiters/media-glance/index.jsx";
import AboutUs from "../../pages/shared/about-us/index.jsx";
import SummerWebDevelopment2025 from "../../pages/shared/training/summer-web-development-2025/index.jsx";
import MockInterview from "../../pages/shared/training/mock-interview/index.jsx";
import PlacementGuide from "../../pages/shared/resources/placement-guide/index.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      {/* <Route path="admin">
          <Route path="login" element={<AdminLogin />} />
          <Route path="register" element={<AdminRegister />} />
        </Route>
        <Route path="student">
          <Route path="login" element={<StudentLogin />} />
          <Route path="register" element={<StudentRegister />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route> */}

      {/* Public Routes  */}
      <Route path="about-us" element={<AboutUs />} />
      <Route path="/academics">
        <Route path="course-highlights" element={<CourseHighlights />} />
      </Route>

      {/* Recruiters */}
      <Route path="/recruiters">
        <Route path="reach-us" element={<ReachUs />} />
        <Route path="why-us" element={<WhyUs />} />
        <Route path="media-glance" element={<MediaGlance />} />
      </Route>

      {/* Training & Career */}
      <Route path="/training">
        <Route
          path="summer-web-development-2025"
          element={<SummerWebDevelopment2025 />}
        />
        <Route path="mock-interview" element={<MockInterview />} />
        <Route path="placement-guide" element={<PlacementGuide />} />
      </Route>

      {/* Tools & Resources  */}
      <Route path="/resources">
        <Route path="placement-guide" element={<PlacementGuide />} />
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
