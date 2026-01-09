/**
 * Jobs API Service
 * Handles job-related API calls
 */
import api from '../config';

const jobsApi = {
  // Get all jobs with optional filters
  getJobs: async (params = {}) => {
    const response = await api.get('/jobs', { params });
    return response.data;
  },

  // Get job by ID
  getJob: async (jobId) => {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  },

  // Get eligible jobs for student
  getEligibleJobs: async (params = {}) => {
    const response = await api.get('/jobs/student/eligible', { params });
    return response.data;
  },

  // Create new job (Recruiter)
  createJob: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },

  // Update job
  updateJob: async (jobId, jobData) => {
    const response = await api.patch(`/jobs/${jobId}`, jobData);
    return response.data;
  },

  // Publish job
  publishJob: async (jobId) => {
    const response = await api.post(`/jobs/${jobId}/publish`);
    return response.data;
  },

  // Close job
  closeJob: async (jobId) => {
    const response = await api.post(`/jobs/${jobId}/close`);
    return response.data;
  },

  // Delete job (Admin)
  deleteJob: async (jobId) => {
    const response = await api.delete(`/jobs/${jobId}`);
    return response.data;
  },

  // Approve job (Admin/Coordinator)
  approveJob: async (jobId) => {
    const response = await api.post(`/jobs/${jobId}/approve`);
    return response.data;
  },

  // Get recruiter's jobs
  getMyJobs: async (params = {}) => {
    const response = await api.get('/jobs/recruiter/my-jobs', { params });
    return response.data;
  },
};

export default jobsApi;
