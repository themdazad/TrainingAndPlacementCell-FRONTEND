/**
 * Announcements API Service
 * Handles announcement operations
 */
import apiClient from '../config';

const announcementsAPI = {
  // Get public announcements (for homepage)
  getPublicAnnouncements: async (params = {}) => {
    const response = await apiClient.get('/announcements/public', { params });
    return response;
  },

  // Get all announcements (Admin)
  getAllAnnouncements: async (params = {}) => {
    const response = await apiClient.get('/announcements', { params });
    return response;
  },

  // Get announcement by ID
  getAnnouncementById: async (id) => {
    const response = await apiClient.get(`/announcements/${id}`);
    return response;
  },

  // Create announcement
  createAnnouncement: async (data) => {
    const response = await apiClient.post('/announcements', data);
    return response;
  },

  // Update announcement
  updateAnnouncement: async (id, data) => {
    const response = await apiClient.put(`/announcements/${id}`, data);
    return response;
  },

  // Toggle announcement status
  toggleAnnouncementStatus: async (id) => {
    const response = await apiClient.patch(`/announcements/${id}/toggle`);
    return response;
  },

  // Delete announcement
  deleteAnnouncement: async (id) => {
    const response = await apiClient.delete(`/announcements/${id}`);
    return response;
  },
};

export default announcementsAPI;
