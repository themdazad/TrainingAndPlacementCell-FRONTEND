import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../../pages/student/dashboard/index.jsx";
import PrivateRoute from "../../components/auth/PrivateRoute.jsx";

const AppRoutes = () => {
  return (
    <PrivateRoute>
      <Routes>
        <Route path="/dashboard/student" element={<StudentDashboard />} />
      </Routes>
    </PrivateRoute>
  );
};
export default AppRoutes;
