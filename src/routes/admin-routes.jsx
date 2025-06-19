import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/auth/PrivateRoute.jsx"; // common
import AdminDashboard from "../modules/admin/pages/dashboard/index.jsx";

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
