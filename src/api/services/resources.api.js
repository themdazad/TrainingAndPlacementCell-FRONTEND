/**
 * Resources API Service
 * Handles study materials, mock tests, interview experiences
 */
import api from '../config';

const resourcesApi = {
  // Get all resources
  getResources: async (params = {}) => {
    const response = await api.get('/resources', { params });
    return response.data;
  },

  // Get resource by ID
  getResource: async (resourceId) => {
    const response = await api.get(`/resources/${resourceId}`);
    return response.data;
  },

  // Get popular resources
  getPopularResources: async (limit = 10) => {
    const response = await api.get('/resources/popular', { params: { limit } });
    return response.data;
  },

  // Get interview experiences
  getInterviewExperiences: async (params = {}) => {
    const response = await api.get('/resources/interview-experiences', { params });
    return response.data;
  },

  // Create resource (Admin/Coordinator)
  createResource: async (resourceData) => {
    const response = await api.post('/resources', resourceData);
    return response.data;
  },

  // Update resource
  updateResource: async (resourceId, resourceData) => {
    const response = await api.patch(`/resources/${resourceId}`, resourceData);
    return response.data;
  },

  // Delete resource
  deleteResource: async (resourceId) => {
    const response = await api.delete(`/resources/${resourceId}`);
    return response.data;
  },

  // Approve resource (Admin)
  approveResource: async (resourceId) => {
    const response = await api.post(`/resources/${resourceId}/approve`);
    return response.data;
  },

  // Like resource
  likeResource: async (resourceId) => {
    const response = await api.post(`/resources/${resourceId}/like`);
    return response.data;
  },

  // Track download
  trackDownload: async (resourceId) => {
    const response = await api.post(`/resources/${resourceId}/download`);
    return response.data;
  },
};

export default resourcesApi;
