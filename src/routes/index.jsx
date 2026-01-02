import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import NProgress from 'nprogress';
import PATHS from '../constants/paths.js';
// Layouts
import MainLayout from '../layouts/MainLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';

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

const AppRoutes = () => {
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

        <Route element={<AuthLayout />}>
          {/* Auth Routes */}
          <Route path={PATHS.AUTH.LOGIN} element={<Login />} />
          <Route path={PATHS.AUTH.SIGNUP} element={<Signup />} />
          <Route path={PATHS.AUTH.FORGOT_PASSWORD} element={<ForgotPassword />} />
        </Route>
        {/* 🔒 Protected Routes */}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
