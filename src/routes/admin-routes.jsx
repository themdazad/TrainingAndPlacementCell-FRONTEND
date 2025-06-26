import { Route } from "react-router-dom";
import AdminDashboard from "../modules/admin/views/dashboard/index.jsx";
import PrivateRoute from "../components/auth/PrivateRoute.jsx";

export const adminRoutes = [
  <Route
    key="/dashboard/admin"
    path="/dashboard/admin"
    element={
      <PrivateRoute>
        <AdminDashboard />
      </PrivateRoute>
    }
  />,
];
