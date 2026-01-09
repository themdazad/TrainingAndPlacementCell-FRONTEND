/**
 * Role-based utility functions
 */
import { USER_ROLES } from '../constants/api.constants';

/**
 * Check if user has a specific role
 */
export const hasRole = (user, role) => {
  if (!user || !user.role) return false;
  return user.role === role;
};

/**
 * Check if user has any of the specified roles
 */
export const hasAnyRole = (user, roles) => {
  if (!user || !user.role) return false;
  return roles.includes(user.role);
};

/**
 * Check if user is a student
 */
export const isStudent = (user) => hasRole(user, USER_ROLES.STUDENT);

/**
 * Check if user is an admin
 */
export const isAdmin = (user) => hasRole(user, USER_ROLES.ADMIN);

/**
 * Check if user is a coordinator
 */
export const isCoordinator = (user) => hasRole(user, USER_ROLES.COORDINATOR);

/**
 * Check if user is a recruiter
 */
export const isRecruiter = (user) => hasRole(user, USER_ROLES.RECRUITER);

/**
 * Check if user is staff (admin or coordinator)
 */
export const isStaff = (user) => 
  hasAnyRole(user, [USER_ROLES.ADMIN, USER_ROLES.COORDINATOR]);

/**
 * Get dashboard path based on user role
 */
export const getDashboardPath = (user) => {
  if (!user || !user.role) return '/';
  
  const dashboardPaths = {
    [USER_ROLES.STUDENT]: '/dashboard/student',
    [USER_ROLES.ADMIN]: '/dashboard/admin',
    [USER_ROLES.COORDINATOR]: '/dashboard/coordinator',
    [USER_ROLES.RECRUITER]: '/dashboard/recruiter',
  };
  
  return dashboardPaths[user.role] || '/';
};

/**
 * Get user's full name
 */
export const getFullName = (user) => {
  if (!user) return '';
  return `${user.firstName || ''} ${user.lastName || ''}`.trim();
};

/**
 * Get user's initials for avatar
 */
export const getInitials = (user) => {
  if (!user) return '';
  const first = user.firstName?.[0] || '';
  const last = user.lastName?.[0] || '';
  return `${first}${last}`.toUpperCase();
};

/**
 * Format date for display
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  return new Date(date).toLocaleDateString('en-IN', {
    ...defaultOptions,
    ...options,
  });
};

/**
 * Format date with time
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format salary/package for display
 */
export const formatPackage = (amount, currency = 'INR') => {
  if (!amount) return 'Not disclosed';
  
  if (currency === 'INR') {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} LPA`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Check if application deadline has passed
 */
export const isDeadlinePassed = (deadline) => {
  if (!deadline) return false;
  return new Date(deadline) < new Date();
};

/**
 * Get relative time (e.g., "2 hours ago")
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now - then) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return formatDate(date);
};

export default {
  hasRole,
  hasAnyRole,
  isStudent,
  isAdmin,
  isCoordinator,
  isRecruiter,
  isStaff,
  getDashboardPath,
  getFullName,
  getInitials,
  formatDate,
  formatDateTime,
  formatPackage,
  truncateText,
  isDeadlinePassed,
  getRelativeTime,
};
