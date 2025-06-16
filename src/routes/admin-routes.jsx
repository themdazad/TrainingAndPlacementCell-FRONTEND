import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/dashboard/index.jsx";
import PrivateRoute from "../components/auth/PrivateRoute.jsx";

const adminRoutes = [
  {
    path: "/dashboard/admin",
    Page: <AdminDashboard />,
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      {adminRoutes.map((value, index) => {
        return (
          <Route
            key={index}
            path={value.path}
            element={<PrivateRoute>{value.Page}</PrivateRoute>}
          />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
