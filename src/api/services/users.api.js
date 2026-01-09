/**
 * Users API Service
 * Handles user management operations for admin
 */
import apiClient from '../config';

const usersAPI = {
  // Get dashboard stats for admin
  getDashboardStats: async () => {
    const response = await apiClient.get('/users/stats/dashboard');
    return response;
  },

  // Get all users with filters
  getAllUsers: async (params = {}) => {
    const response = await apiClient.get('/users', { params });
    return response;
  },

  // Toggle user verification status
  toggleUserVerification: async (userId) => {
    const response = await apiClient.patch(`/users/${userId}/toggle-verify`);
    return response;
  },

  // Delete user
  deleteUser: async (userId) => {
    const response = await apiClient.delete(`/users/${userId}`);
    return response;
  },

  // Get all students with filters
  getStudents: async (params = {}) => {
    const response = await apiClient.get('/users/students', { params });
    return response;
  },

  // Get student by ID
  getStudentById: async (studentId) => {
    const response = await apiClient.get(`/users/students/${studentId}`);
    return response;
  },

  // Update student status
  updateStudentStatus: async (studentId, data) => {
    const response = await apiClient.patch(`/users/students/${studentId}/status`, data);
    return response;
  },

  // Update student profile (full edit)
  updateStudent: async (studentId, data) => {
    const response = await apiClient.put(`/users/students/${studentId}`, data);
    return response;
  },

  // Get all coordinators
  getCoordinators: async (params = {}) => {
    const response = await apiClient.get('/users/coordinators', { params });
    return response;
  },

  // Create coordinator
  createCoordinator: async (data) => {
    const response = await apiClient.post('/users/coordinators', data);
    return response;
  },

  // Update coordinator
  updateCoordinator: async (coordinatorId, data) => {
    const response = await apiClient.patch(`/users/coordinators/${coordinatorId}`, data);
    return response;
  },

  // Remove coordinator
  removeCoordinator: async (coordinatorId) => {
    const response = await apiClient.delete(`/users/coordinators/${coordinatorId}`);
    return response;
  },

  // Get all recruiters
  getRecruiters: async (params = {}) => {
    const response = await apiClient.get('/users/recruiters', { params });
    return response;
  },

  // Get recruiter by ID
  getRecruiterById: async (recruiterId) => {
    const response = await apiClient.get(`/users/recruiters/${recruiterId}`);
    return response;
  },

  // Verify recruiter
  verifyRecruiter: async (recruiterId) => {
    const response = await apiClient.patch(`/users/recruiters/${recruiterId}/verify`);
    return response;
  },

  // Reject recruiter
  rejectRecruiter: async (recruiterId, reason) => {
    const response = await apiClient.patch(`/users/recruiters/${recruiterId}/reject`, { reason });
    return response;
  },

  // Get user stats (for admin dashboard)
  getUserStats: async () => {
    const response = await apiClient.get('/users/stats');
    return response;
  },

  // Bulk import students
  bulkImportStudents: async (formData) => {
    const response = await apiClient.post('/users/students/bulk-import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  // Export students data
  exportStudents: async (params = {}) => {
    const response = await apiClient.get('/users/students/export', {
      params,
      responseType: 'blob',
    });
    return response;
  },
};

export default usersAPI;
