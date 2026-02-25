import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PATHS from '../constants/paths.js';
import { useSelector } from 'react-redux';
import { ProtectedRoute, PublicRoute } from '../components/auth';
import { USER_ROLES } from '../constants/api.constants.js';

// Layouts
import MainLayout from '../layouts/MainLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';

// Main Pages
const Home = lazy(() => import('../pages/home'));
const AboutUs = lazy(() => import('../pages/about/index.jsx'));
const Alumni = lazy(() => import('../pages/alumni/index.jsx'));
const Gallery = lazy(() => import('../pages/gallery/index.jsx'));
const Projects = lazy(() => import('../pages/projects'));
const ResumeBuilder = lazy(() => import('../features/resume-builder'));

// Auth Pages
const Login = lazy(() => import('../pages/auth/components/Login.jsx'));
const Signup = lazy(() => import('../pages/auth/components/Signup.jsx'));
const ForgotPassword = lazy(() => import('../pages/auth/components/ForgotPassword.jsx'));

const ResetPassword = lazy(() => import('../pages/auth/components/ResetPassword.jsx'));

// Dashboard Fallback - used for redirect logic
// eslint-disable-next-line no-unused-vars
const Dashboard = lazy(() => import('../pages/dashboard/index.jsx'));

// Student Dashboard Pages
const StudentDashboard = lazy(() => import('../pages/dashboard/student'));
const StudentProfile = lazy(() => import('../pages/dashboard/student/profile'));
const StudentProjects = lazy(() => import('../pages/dashboard/student/projects'));

// Admin Dashboard Pages
const AdminDashboard = lazy(() => import('../pages/dashboard/admin'));
const AdminStudents = lazy(() => import('../pages/dashboard/admin/students'));
const AdminUserVerification = lazy(() => import('../pages/dashboard/admin/user-verification'));
const AdminAnnouncements = lazy(() => import('../pages/dashboard/admin/announcements'));
const AdminProjects = lazy(() => import('../pages/dashboard/admin/projects'));

const AppRoutes = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  return (
    <Suspense fallback={null}>
      <Routes>
        {/* 🌐 Public Routes with Main Layout */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={PATHS.MAIN.ABOUT_US} element={<AboutUs />} />
          <Route path={PATHS.MAIN.ALUMNI} element={<Alumni />} />
          <Route path={PATHS.MAIN.GALLERY} element={<Gallery />} />
          <Route path={PATHS.MAIN.PROJECTS} element={<Projects />} />
          <Route path={PATHS.MAIN.RESUME_BUILDER} element={<ResumeBuilder />} />
        </Route>

        {/* 🔐 Auth Routes - Redirect if already logged in */}
        <Route element={<AuthLayout />}>
          <Route
            path={PATHS.AUTH.LOGIN}
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path={PATHS.AUTH.SIGNUP}
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route path={PATHS.AUTH.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={PATHS.AUTH.RESET_PASSWORD} element={<ResetPassword />} />
        </Route>

        {/* 🔒 Protected Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          {/* Dashboard root - redirect based on role */}
          <Route
            path={PATHS.DASHBOARD.ROOT}
            element={
              <ProtectedRoute>
                <Navigate
                  to={
                    role === USER_ROLES.STUDENT
                      ? PATHS.STUDENT.DASHBOARD
                      : role === USER_ROLES.ADMIN
                        ? PATHS.ADMIN.DASHBOARD
                        : role === USER_ROLES.COORDINATOR
                          ? PATHS.COORDINATOR.DASHBOARD
                          : role === USER_ROLES.RECRUITER
                            ? PATHS.RECRUITER.DASHBOARD
                            : PATHS.MAIN.HOME
                  }
                  replace
                />
              </ProtectedRoute>
            }
          />

          {/* ===================== STUDENT ROUTES ===================== */}
          <Route
            path={PATHS.STUDENT.DASHBOARD}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.STUDENT.PROFILE}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                <StudentProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.STUDENT.PROJECTS}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                <StudentProjects />
              </ProtectedRoute>
            }
          />

          {/* ===================== ADMIN ROUTES ===================== */}
          <Route
            path={PATHS.ADMIN.DASHBOARD}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path={PATHS.ADMIN.STUDENTS}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                <AdminStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.ADMIN.USER_VERIFICATION}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                <AdminUserVerification />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.ADMIN.ANNOUNCEMENTS}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                <AdminAnnouncements />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.ADMIN.PROJECTS}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                <AdminProjects />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 404 - Catch all */}
        <Route path="*" element={<Navigate to={PATHS.MAIN.HOME} replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
