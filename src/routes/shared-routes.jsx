import { Routes, Route } from "react-router-dom";
// Shared Routes
import Home from "../modules/shared/pages/home/index.jsx";
import Auth from "../modules/shared/pages/auth/index.jsx";
import Projects from "../modules/shared/pages/projects/index.jsx";
import ProjectDetailsPage from "../modules/shared/pages/projects/project-details-page.jsx";

import AboutUs from "../modules/shared/pages/about-us/index.jsx";
// Careers Pages 
import PlacementDrives from "../modules/shared/pages/careers/placement-drives/placement-drives.jsx";
import SummerWebDevelopment2025 from "../modules/shared/pages/careers/summer-web-development-2025/index.jsx";

const AppRoutes = () => { 
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Careers */}
      <Route path="/careers">
        <Route path="placement-drives" element={<PlacementDrives />} />
        <Route
          path="summer-web-development-2025"
          element={<SummerWebDevelopment2025 />}
        />
      </Route>

      <Route path="/student">
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:title/:id" element={<ProjectDetailsPage />} />
      </Route>

      <Route path="/auth" element={<Auth />} />
      <Route path="about-us" element={<AboutUs />} />
    </Routes>
  );
};
export default AppRoutes;
