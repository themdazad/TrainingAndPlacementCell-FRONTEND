/**
 * API Services - Centralized Export (Barrel File)
 * Explanation:
 * This file consolidates all API service modules for easy import elsewhere in the application.
 * Each service module handles specific API endpoints and operations.
 
 */

export { default as api } from './config';
export { default as authAPI } from './services/auth.api';
export { default as jobsAPI } from './services/jobs.api';
export { default as applicationsAPI } from './services/applications.api';
export { default as resourcesAPI } from './services/resources.api';
export { default as eventsAPI } from './services/events.api';
export { default as usersAPI } from './services/users.api';
export { default as announcementsAPI } from './services/announcements.api';
