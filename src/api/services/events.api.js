/**
 * Events API Service
 * Explanation:
 * This module provides functions to interact with the Events API endpoints.
 * It includes methods for retrieving, creating, updating, and managing events,
 * as well as handling registrations, attendance, and feedback.
 */

import api from '../axiosInstance';

const eventsApi = {
  // Get all events
  getEvents: async (params = {}) => {
    const response = await api.get('/events', { params });
    return response.data;
  },

  // Get event by ID
  getEvent: async (eventId) => {
    const response = await api.get(`/events/${eventId}`);
    return response.data;
  },

  // Get upcoming events
  getUpcomingEvents: async (limit = 10) => {
    const response = await api.get('/events/upcoming', { params: { limit } });
    return response.data;
  },

  // Get my registered events (Student)
  getMyEvents: async (params = {}) => {
    const response = await api.get('/events/student/my-events', { params });
    return response.data;
  },

  // Create event (Admin/Coordinator/Recruiter)
  createEvent: async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  // Update event
  updateEvent: async (eventId, eventData) => {
    const response = await api.patch(`/events/${eventId}`, eventData);
    return response.data;
  },

  // Publish event
  publishEvent: async (eventId) => {
    const response = await api.post(`/events/${eventId}/publish`);
    return response.data;
  },

  // Cancel event
  cancelEvent: async (eventId) => {
    const response = await api.post(`/events/${eventId}/cancel`);
    return response.data;
  },

  // Delete event (Admin)
  deleteEvent: async (eventId) => {
    const response = await api.delete(`/events/${eventId}`);
    return response.data;
  },

  // Register for event (Student)
  registerForEvent: async (eventId) => {
    const response = await api.post(`/events/${eventId}/register`);
    return response.data;
  },

  // Cancel registration (Student)
  cancelRegistration: async (eventId) => {
    const response = await api.post(`/events/${eventId}/cancel-registration`);
    return response.data;
  },

  // Get event registrations (Admin/Coordinator)
  getRegistrations: async (eventId, params = {}) => {
    const response = await api.get(`/events/${eventId}/registrations`, { params });
    return response.data;
  },

  // Mark attendance
  markAttendance: async (eventId, studentId, attended = true) => {
    const response = await api.post(`/events/${eventId}/attendance`, {
      studentId,
      attended,
    });
    return response.data;
  },

  // Submit feedback
  submitFeedback: async (eventId, feedbackData) => {
    const response = await api.post(`/events/${eventId}/feedback`, feedbackData);
    return response.data;
  },
};

export default eventsApi;
