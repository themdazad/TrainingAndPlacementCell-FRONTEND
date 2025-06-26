import { Route } from "react-router-dom";
import Auth from "../modules/web/views/auth/index.jsx";
import StudentSignup from "../modules/web/views/auth/student/signup-page.jsx";
import { Outlet } from "react-router-dom";

export const authRoutes = [
  <Route key="/auth" path="/auth" element={<Outlet />}>
    <Route index element={<Auth />} />
    <Route path="student/signup" element={<StudentSignup />} />
    {/* Add other auth routes here */}
  </Route>,
];
