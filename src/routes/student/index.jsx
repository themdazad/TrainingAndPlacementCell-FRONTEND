import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../../pages/student/dashboard/index.jsx";
import PrivateRoute from "../../components/auth/PrivateRoute.jsx";


const studentRoutes = [
  {
    Path: "dashboard/student",
    Page: <StudentDashboard />,
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      {studentRoutes.map((value, index) => {
        return (
          <Route
            key={index}
            path={value.Path}
            element={<PrivateRoute>{value.Page}</PrivateRoute>}
          />
        );
      })}
    </Routes>
  );
};
export default AppRoutes;
