import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NProgress from 'nprogress';
import PATHS from '../constants/paths.js';
import { useSelector } from 'react-redux';
import { ProtectedRoute, PublicRoute } from '../components/auth';
import { USER_ROLES } from '../constants/api.constants.js';

// Layouts
import MainLayout from '../layouts/MainLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';

// Lazy load wrapper that triggers NProgress
const lazyWithProgress = (importFn) => {
  return lazy(() => {
    NProgress.start();
    return importFn().finally(() => NProgress.done());
  });
};

// Main Pages
const Home = lazyWithProgress(() => import('../pages/home'));
const AboutUs = lazyWithProgress(() => import('../pages/about/index.jsx'));
const Alumni = lazyWithProgress(() => import('../pages/alumni/index.jsx'));
const Gallery = lazyWithProgress(() => import('../pages/gallery/index.jsx'));

// Auth Pages
const Login = lazyWithProgress(() => import('../pages/auth/components/Login.jsx'));
const Signup = lazyWithProgress(() => import('../pages/auth/components/Signup.jsx'));
const ForgotPassword = lazyWithProgress(
  () => import('../pages/auth/components/ForgotPassword.jsx')
);
const ResetPassword = lazyWithProgress(() => import('../pages/auth/components/ResetPassword.jsx'));

// Dashboard Fallback - used for redirect logic
// eslint-disable-next-line no-unused-vars
const Dashboard = lazyWithProgress(() => import('../pages/dashboard/index.jsx'));

// Student Dashboard Pages
const StudentDashboard = lazyWithProgress(() => import('../pages/dashboard/student'));
const StudentJobs = lazyWithProgress(() => import('../pages/dashboard/student/jobs'));
const StudentApplications = lazyWithProgress(() => import('../pages/dashboard/student/applications'));
const StudentEvents = lazyWithProgress(() => import('../pages/dashboard/student/events'));
const StudentResources = lazyWithProgress(() => import('../pages/dashboard/student/resources'));
const StudentProfile = lazyWithProgress(() => import('../pages/dashboard/student/profile'));

// Admin Dashboard Pages
const AdminDashboard = lazyWithProgress(() => import('../pages/dashboard/admin'));
const AdminJobs = lazyWithProgress(() => import('../pages/dashboard/admin/jobs'));
const AdminStudents = lazyWithProgress(() => import('../pages/dashboard/admin/students'));
const AdminUserVerification = lazyWithProgress(() => import('../pages/dashboard/admin/user-verification'));
const AdminAnnouncements = lazyWithProgress(() => import('../pages/dashboard/admin/announcements'));

// Coordinator Dashboard Pages
const CoordinatorDashboard = lazyWithProgress(() => import('../pages/dashboard/coordinator'));
const CoordinatorJobs = lazyWithProgress(() => import('../pages/dashboard/coordinator/jobs'));
const CoordinatorStudents = lazyWithProgress(() => import('../pages/dashboard/coordinator/students'));
const CoordinatorApplications = lazyWithProgress(() => import('../pages/dashboard/coordinator/applications'));

// Recruiter Dashboard Pages
const RecruiterDashboard = lazyWithProgress(() => import('../pages/dashboard/recruiter'));
const RecruiterJobs = lazyWithProgress(() => import('../pages/dashboard/recruiter/jobs'));
const CreateJob = lazyWithProgress(() => import('../pages/dashboard/recruiter/jobs/create.jsx'));

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
            path={PATHS.STUDENT.JOBS}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                <StudentJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.STUDENT.APPLICATIONS}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                <StudentApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.STUDENT.EVENTS}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                <StudentEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.STUDENT.RESOURCES}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                <StudentResources />
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
            path={PATHS.ADMIN.JOBS}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
                <AdminJobs />
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

          {/* ===================== COORDINATOR ROUTES ===================== */}
          <Route
            path={PATHS.COORDINATOR.DASHBOARD}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.COORDINATOR, USER_ROLES.ADMIN]}>
                <CoordinatorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.COORDINATOR.JOBS}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.COORDINATOR, USER_ROLES.ADMIN]}>
                <CoordinatorJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.COORDINATOR.STUDENTS}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.COORDINATOR, USER_ROLES.ADMIN]}>
                <CoordinatorStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.COORDINATOR.APPLICATIONS}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.COORDINATOR, USER_ROLES.ADMIN]}>
                <CoordinatorApplications />
              </ProtectedRoute>
            }
          />

          {/* ===================== RECRUITER ROUTES ===================== */}
          <Route
            path={PATHS.RECRUITER.DASHBOARD}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.RECRUITER]}>
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.RECRUITER.JOBS}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.RECRUITER]}>
                <RecruiterJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATHS.RECRUITER.JOBS_CREATE}
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.RECRUITER]}>
                <CreateJob />
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
