/**
 * API Constants
 * Enums, statuses, and configuration values
 */

// User Roles (lowercase to match backend)
export const USER_ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin',
  COORDINATOR: 'coordinator',
  RECRUITER: 'recruiter',
};

// Job Types
export const JOB_TYPES = {
  FULL_TIME: 'Full Time',
  INTERNSHIP: 'Internship',
  PPO: 'PPO',
  CONTRACT: 'Contract',
};

// Job Status
export const JOB_STATUS = {
  DRAFT: 'Draft',
  PENDING_APPROVAL: 'Pending Approval',
  PUBLISHED: 'Published',
  CLOSED: 'Closed',
  CANCELLED: 'Cancelled',
};

// Application Status
export const APPLICATION_STATUS = {
  PENDING: 'Pending',
  UNDER_REVIEW: 'Under Review',
  SHORTLISTED: 'Shortlisted',
  INTERVIEW_SCHEDULED: 'Interview Scheduled',
  INTERVIEWED: 'Interviewed',
  OFFERED: 'Offered',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  WITHDRAWN: 'Withdrawn',
};

// Application Status Colors (for UI - HeroUI color names)
export const APPLICATION_STATUS_COLORS = {
  Pending: 'default',
  'Under Review': 'primary',
  Shortlisted: 'secondary',
  'Interview Scheduled': 'warning',
  Interviewed: 'secondary',
  Offered: 'success',
  Accepted: 'success',
  Rejected: 'danger',
  Withdrawn: 'warning',
};

// Event Types
export const EVENT_TYPES = {
  PPT: 'PPT',
  WORKSHOP: 'Workshop',
  SEMINAR: 'Seminar',
  TRAINING: 'Training',
  MOCK_INTERVIEW: 'Mock Interview',
  CAREER_FAIR: 'Career Fair',
  OTHER: 'Other',
};

// Event Status
export const EVENT_STATUS = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
  ONGOING: 'Ongoing',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

// Resource Types
export const RESOURCE_TYPES = {
  STUDY_MATERIAL: 'Study Material',
  MOCK_TEST: 'Mock Test',
  INTERVIEW_EXPERIENCE: 'Interview Experience',
  PLACEMENT_GUIDE: 'Placement Guide',
  RESUME_TEMPLATE: 'Resume Template',
  OTHER: 'Other',
};

// Resource Visibility
export const RESOURCE_VISIBILITY = {
  PUBLIC: 'Public',
  STUDENTS_ONLY: 'Students Only',
  BATCH_SPECIFIC: 'Batch Specific',
  BRANCH_SPECIFIC: 'Branch Specific',
};

// Placement Status (matching backend enum)
export const PLACEMENT_STATUS = {
  SEEKING: 'Seeking',
  PLACED: 'Placed',
  NOT_INTERESTED: 'Not Interested',
  HIGHER_STUDIES: 'Higher Studies',
};

// Branches
export const BRANCHES = [
  'Computer Science',
  'Information Technology',
  'Electronics',
  'Electrical',
  'Mechanical',
  'Civil',
  'Chemical',
  'Biotechnology',
  'Other',
];

// Batches (last 5 years + next 2)
const currentYear = new Date().getFullYear();
export const BATCHES = Array.from(
  { length: 7 },
  (_, i) => currentYear - 4 + i
);

// Skills categories
export const SKILL_CATEGORIES = {
  PROGRAMMING: 'Programming Languages',
  WEB: 'Web Technologies',
  DATABASE: 'Databases',
  TOOLS: 'Tools & Frameworks',
  SOFT: 'Soft Skills',
  OTHER: 'Other',
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  API: 'yyyy-MM-dd',
  INPUT: 'yyyy-MM-dd',
};

// File upload limits
export const FILE_LIMITS = {
  RESUME_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  IMAGE_MAX_SIZE: 2 * 1024 * 1024, // 2MB
  ALLOWED_RESUME_TYPES: ['application/pdf'],
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
};

// Export all as default object too
export default {
  USER_ROLES,
  JOB_TYPES,
  JOB_STATUS,
  APPLICATION_STATUS,
  APPLICATION_STATUS_COLORS,
  EVENT_TYPES,
  EVENT_STATUS,
  RESOURCE_TYPES,
  RESOURCE_VISIBILITY,
  PLACEMENT_STATUS,
  BRANCHES,
  BATCHES,
  SKILL_CATEGORIES,
  PAGINATION,
  DATE_FORMATS,
  FILE_LIMITS,
};
