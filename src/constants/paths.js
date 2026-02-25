const PATHS = {
  // Public pages (Website ke aam parde)
  MAIN: {
    HOME: '/',
    ABOUT_US: '/about-us',
    ALUMNI: '/alumni',
    GALLERY: '/gallery',
    PROJECTS: '/projects',
    RESUME_BUILDER: '/resume-builder',
    ASSISTANT: '/ai_assistant',
  },

  // Authentication (Ghar mein dakhila lene ke liye)
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/auth/reset-password/:resetToken',
    VERIFY_OTP: '/verify-otp',
  },

  // Common Dashboard
  DASHBOARD: {
    ROOT: '/dashboard',
    PROFILE: '/dashboard/profile',
  },

  // Student Dashboard
  STUDENT: {
    DASHBOARD: '/dashboard/student',
    PROJECTS: '/dashboard/student/projects',
    JOBS: '/dashboard/student/jobs',
    JOB_DETAIL: '/dashboard/student/jobs/:jobId',
    APPLICATIONS: '/dashboard/student/applications',
    EVENTS: '/dashboard/student/events',
    RESOURCES: '/dashboard/student/resources',
    PROFILE: '/dashboard/student/profile',
  },

  // Admin Dashboard
  ADMIN: {
    DASHBOARD: '/dashboard/admin',
    PROJECTS: '/dashboard/admin/projects',
    JOBS: '/dashboard/admin/jobs',
    JOB_DETAIL: '/dashboard/admin/jobs/:jobId',
    STUDENTS: '/dashboard/admin/students',
    STUDENT_DETAIL: '/dashboard/admin/students/:studentId',
    COORDINATORS: '/dashboard/admin/coordinators',
    RECRUITERS: '/dashboard/admin/recruiters',
    EVENTS: '/dashboard/admin/events',
    RESOURCES: '/dashboard/admin/resources',
    ANALYTICS: '/dashboard/admin/analytics',
    SETTINGS: '/dashboard/admin/settings',
    USER_VERIFICATION: '/dashboard/admin/user-verification',
    ANNOUNCEMENTS: '/dashboard/admin/announcements',
  },

  // Public Job/Event routes (for non-logged-in users)
  JOBS: {
    LIST: '/jobs',
    DETAIL: '/jobs/:jobId',
  },

  EVENTS: {
    LIST: '/events',
    DETAIL: '/events/:eventId',
  },

  RESOURCES: {
    LIST: '/resources',
    DETAIL: '/resources/:resourceId',
    INTERVIEW_EXPERIENCES: '/resources/interview-experiences',
  },
};

export default PATHS;

/**
 * PROJECT ROUTE CONSTANTS
 * * 🤔 KYU? (Why):
 * 1. "Single Source of Truth": Agar URL change karna ho (e.g., /login se /auth/login),
 * toh sirf yahan ek baar badalna padega, poore project ki 50 files mein nahi.
 * 2. "No Typos": Strings (" ") likhne mein galti ho sakti hai, par object keys (PATHS.LOGIN)
 * mein galti hone par VS Code turant error de dega.
 * * 💡 KAISE? (How):
 * Grouping kari gayi hai 'Role' ke hisaab se:
 * - MAIN: Public pages jo sabko dikhte hain.
 * - AUTH: Login/Signup related (Aksar bina Navbar wale).
 * - STUDENT/ADMIN/COORDINATOR/RECRUITER: Role-specific dashboard pages.
 */
