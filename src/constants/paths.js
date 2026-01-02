/**
 * PROJECT ROUTE CONSTANTS
 * * 🤔 KYU? (Why):
 * 1. "Single Source of Truth": Agar URL change karna ho (e.g., /login se /auth/login),
 * toh sirf yahan ek baar badalna padega, poore project ki 50 files mein nahi.
 * 2. "No Typos": Strings (" ") likhne mein galti ho sakti hai, par object keys (PATHS.LOGIN)
 * mein galti hone par VS Code turant error de dega.
 * * 💡 KAISE? (How):
 * Grouping kari gayi hai 'Domain' ke hisaab se:
 * - MAIN: Public pages jo sabko dikhte hain.
 * - AUTH: Login/Signup related (Aksar bina Navbar wale).
 * - DASHBOARD: User login hone ke baad ke pages.
 */

const PATHS = {
  // Public pages (Website ke aam parde)
  MAIN: {
    HOME: '/',
    ABOUT_US: '/about-us',
    ALUMNI: '/alumni',
    GALLERY: '/gallery',
  },

  // Authentication (Ghar mein dakhila lene ke liye)
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
  },

  // Private Panels (Andar ka maamla - Sidebar ke saath)
  DASHBOARD: {
    STUDENT: '/student/dashboard',
    ADMIN: '/admin/dashboard',
  },
};

export default PATHS;
