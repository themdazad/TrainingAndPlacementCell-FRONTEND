/**
 * Applications API Service
 * Explanation:
 * This module provides functions to interact with the backend API for managing job applications.
 * It includes methods for applying to jobs, retrieving applications, updating statuses, and more.
 */
import api from '../config';

const applicationsApi = {
  // Apply to a job
  applyToJob: async (jobId, applicationData = {}) => {
    const response = await api.post(`/applications/jobs/${jobId}/apply`, applicationData);
    return response.data;
  },

  // Get my applications (Student)
  getMyApplications: async (params = {}) => {
    const response = await api.get('/applications/my', { params });
    return response.data;
  },

  // Get applications for a job (Recruiter/Admin)
  getJobApplications: async (jobId, params = {}) => {
    const response = await api.get(`/applications/jobs/${jobId}`, { params });
    return response.data;
  },

  // Get application by ID
  getApplication: async (applicationId) => {
    const response = await api.get(`/applications/${applicationId}`);
    return response.data;
  },

  // Update application status (Recruiter/Admin)
  updateStatus: async (applicationId, status, remarks = '') => {
    const response = await api.patch(`/applications/${applicationId}/status`, {
      status,
      remarks,
    });
    return response.data;
  },

  // Withdraw application (Student)
  withdrawApplication: async (applicationId) => {
    const response = await api.post(`/applications/${applicationId}/withdraw`);
    return response.data;
  },

  // Schedule interview
  scheduleInterview: async (applicationId, interviewData) => {
    const response = await api.post(`/applications/${applicationId}/interview`, interviewData);
    return response.data;
  },

  // Record offer
  recordOffer: async (applicationId, offerData) => {
    const response = await api.post(`/applications/${applicationId}/offer`, offerData);
    return response.data;
  },

  // Bulk update status
  bulkUpdateStatus: async (applicationIds, status, remarks = '') => {
    const response = await api.post('/applications/bulk-status', {
      applicationIds,
      status,
      remarks,
    });
    return response.data;
  },
};

export default applicationsApi;
