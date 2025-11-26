import { Route } from "react-router-dom";
import StudentDashboard from "../modules/student/views/dashboard/index.jsx";
import PrivateRoute from "../components/auth/PrivateRoute.jsx";

export const studentRoutes = [
  <Route
    key="/dashboard/student"
    path="/dashboard/student"
    element={
      <PrivateRoute>
        <StudentDashboard />
      </PrivateRoute>
    }
  />,
];
