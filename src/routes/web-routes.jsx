import { Route } from "react-router-dom";
import Home from "../modules/web/views/home/index.jsx";
import AboutUs from "../modules/web/views/about-us/index.jsx";
import Gallery from "../modules/web/views/gallery-page/index.jsx";
import Alumni from "../modules/web/views/alumni/index.jsx";
import Error_404 from "../components/error_404.jsx";
import PlacementDrivesPage from "../modules/web/views/careers/placement-drives/placement-drives.jsx";
import SummerWebDevelopment2025 from "../modules/web/views/careers/summer-web-development-2025/index.jsx";

export const webRoutes = [
  <Route index element={<Home />} />,
  <Route path="/careers">
    <Route path="summer-web-development-2025" element={<SummerWebDevelopment2025 />}/>
    <Route path="placement-drives" element={<PlacementDrivesPage />} />
  </Route>,
    <Route path="/alumni" element={<Alumni />} />,
    <Route path="/gallery" element={<Gallery />} />,
    <Route path="/about-us" element={<AboutUs />} />,
  <Route path="*" element={<Error_404 />} />,
];
