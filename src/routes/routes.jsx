import { Routes } from "react-router-dom";
import { webRoutes } from "./web-routes.jsx";
import { studentRoutes } from "./student-routes.jsx";
import { adminRoutes } from "./admin-routes.jsx";
import { authRoutes } from "./auth-routes.jsx";

const AppRoutes = () => (
  <Routes>
    {webRoutes}
    {studentRoutes}
    {adminRoutes}
    {authRoutes}
  </Routes>
);

export default AppRoutes;
