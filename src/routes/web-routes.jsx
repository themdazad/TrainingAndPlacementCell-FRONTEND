import { Route } from "react-router-dom";
import Home from "../modules/web/views/home/index.jsx";
import AboutUs from "../modules/web/views/about-us/index.jsx";
import Gallery from "../modules/web/views/gallery-page/index.jsx";
import Alumni from "../modules/web/views/alumni/index.jsx";
import Error_404 from "../components/error_404.jsx";

export const webRoutes = [
  <Route key="/" path="/" element={<Home />} />,
  <Route key="about-us" path="/about-us" element={<AboutUs />} />,
  <Route key="gallery" path="/gallery" element={<Gallery />} />,
  <Route key="alumni" path="/alumni" element={<Alumni />} />,
  <Route key="404" path="*" element={<Error_404 />} />,
];
