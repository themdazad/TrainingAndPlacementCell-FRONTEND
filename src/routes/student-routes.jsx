import { Route } from "react-router-dom";
import StudentDashboard from "../modules/student/views/dashboard/index.jsx";
import Projects from "../modules/web/views/projects/index.jsx";
import ProjectDetailsPage from "../modules/web/views/projects/project-details-page.jsx";
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
  <Route
    key="/student/projects"
    path="/student/projects"
    element={<Projects />}
  />,
  <Route
    key="/student/projects/:title/:id"
    path="/student/projects/:title/:id"
    element={<ProjectDetailsPage />}
  />,
];
