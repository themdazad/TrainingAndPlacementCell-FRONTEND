import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../../pages/student/dashboard/index.jsx";
import PrivateRoute from "../../components/auth/PrivateRoute.jsx";

const AppRoutes = () => {
  return (
    <Routes>
        <PrivateRoute>
          <Route path="/dashboard/student" element={<StudentDashboard />} />
        </PrivateRoute>
      </Routes>
  );
};
export default AppRoutes;
