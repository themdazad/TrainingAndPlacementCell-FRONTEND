import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../../pages/student/dashboard/index.jsx";
import PrivateRoute from "../../components/auth/PrivateRoute.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/dashboard/student"
        element={
          <PrivateRoute>
            <StudentDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
export default AppRoutes;
