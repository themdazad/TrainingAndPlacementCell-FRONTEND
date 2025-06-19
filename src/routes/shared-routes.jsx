import { Routes, Route } from "react-router-dom";
// Shared Routes
import Home from "../modules/shared/pages/home/index.jsx";
import Auth from "../modules/shared/pages/auth/index.jsx";
import CampusPlacements2025 from "../modules/shared/pages/campus-placement/2025/campus-placement-2025.jsx";
import Projects from "../modules/shared/pages/projects/index.jsx";
import CourseHighlights from "../modules/shared/pages/academics/course-highlights/index.jsx";
import ProjectDetailsPage from "../modules/shared/pages/projects/project-details-page.jsx";

import AboutUs from "../modules/shared/pages/about-us/index.jsx";
import SummerWebDevelopment2025 from "../modules/shared/pages/training/summer-web-development-2025/index.jsx";
import ResumeBuilder from "../modules/shared/pages/resume-builder/index.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      
      {/* Public Routes  */}
      <Route path="about-us" element={<AboutUs />} />
      <Route path="/academics">
        <Route path="course-highlights" element={<CourseHighlights />} />
      </Route>


      {/* Training */}
      <Route path="/training">
        <Route
          path="summer-web-development-2025"
          element={<SummerWebDevelopment2025 />}
        />
      </Route>

      <Route path="/student">
        <Route path="tools/resume-builder" element={<ResumeBuilder />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:title/:id" element={<ProjectDetailsPage />} />
      </Route>

      <Route path="campus-placement-2025" element={<CampusPlacements2025 />} />
    </Routes>
  );
};
export default AppRoutes;
