/**
 * API Services - Centralized Export (Barrel File)
 * Explanation:
 * This file consolidates all API service modules for easy import elsewhere in the application.
 * Each service module handles specific API endpoints and operations.
 
 */

export { default as api } from './config.js';
export { default as authAPI } from './services/auth.api.js';
export { default as jobsAPI } from './services/jobs.api.js';
export { default as applicationsAPI } from './services/applications.api.js';
export { default as resourcesAPI } from './services/resources.api.js';
export { default as eventsAPI } from './services/events.api.js';
export { default as usersAPI } from './services/users.api.js';
export { default as announcementsAPI } from './services/announcements.api.js';
