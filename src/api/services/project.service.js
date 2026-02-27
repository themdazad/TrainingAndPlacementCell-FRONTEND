import apiClient from '../config';

/**
 * Project API Service
 * Mirrors backend project controller function names.
 */
const projectAPI = {
  /**
   * Fetch published projects (public)
   * @param {object} params
   * @returns {Promise<import('axios').AxiosResponse<any>>}
   */
  getPublishedProjects: async (params = {}) => {
    const response = await apiClient.get('/projects/published', { params });
    return response;
  },

  /**
   * Create project (student)
   * @param {object} projectData
   * @returns {Promise<import('axios').AxiosResponse<any>>}
   */
  createProject: async (projectData) => {
    const response = await apiClient.post('/projects', projectData);
    return response;
  },

  /**
   * Fetch logged-in student's projects
   * @param {object} params
   * @returns {Promise<import('axios').AxiosResponse<any>>}
   */
  getMyProjects: async (params = {}) => {
    const response = await apiClient.get('/projects/my-projects', { params });
    return response;
  },

  /**
   * Fetch a project by id (protected)
   * @param {string} id
   * @returns {Promise<import('axios').AxiosResponse<any>>}
   */
  getProjectById: async (id) => {
    const response = await apiClient.get(`/projects/${id}`);
    return response;
  },

  /**
   * Update project by id (student owner)
   * @param {string} id
   * @param {object} updateData
   * @returns {Promise<import('axios').AxiosResponse<any>>}
   */
  updateProject: async (id, updateData) => {
    const response = await apiClient.put(`/projects/${id}`, updateData);
    return response;
  },

  /**
   * Delete project by id (student owner)
   * @param {string} id
   * @returns {Promise<import('axios').AxiosResponse<any>>}
   */
  deleteProject: async (id) => {
    const response = await apiClient.delete(`/projects/${id}`);
    return response;
  },

  /**
   * Fetch all projects (admin)
   * @param {object} params
   * @returns {Promise<import('axios').AxiosResponse<any>>}
   */
  getAllProjects: async (params = {}) => {
    const response = await apiClient.get('/projects/admin/all', { params });
    return response;
  },

  /**
   * Approve or reject project (admin)
   * @param {string} id
   * @param {{approvalStatus: 'Approved' | 'Rejected', remarks?: string}} payload
   * @returns {Promise<import('axios').AxiosResponse<any>>}
   */
  approveProject: async (id, payload) => {
    const response = await apiClient.post(`/projects/${id}/approve`, payload);
    return response;
  },

  /**
   * Publish project (admin)
   * @param {string} id
   * @returns {Promise<import('axios').AxiosResponse<any>>}
   */
  publishProject: async (id) => {
    const response = await apiClient.post(`/projects/${id}/publish`);
    return response;
  },

  /**
   * Archive project (admin)
   * @param {string} id
   * @returns {Promise<import('axios').AxiosResponse<any>>}
   */
  archiveProject: async (id) => {
    const response = await apiClient.post(`/projects/${id}/archive`);
    return response;
  },

  /**
   * Suspend project (admin)
   * @param {string} id
   * @returns {Promise<import('axios').AxiosResponse<any>>}
   */
  suspendProject: async (id) => {
    const response = await apiClient.post(`/projects/${id}/suspend`);
    return response;
  },

  /**
   * Delete project (admin)
   * @param {string} id
   * @returns {Promise<import('axios').AxiosResponse<any>>}
   */
  adminDeleteProject: async (id) => {
    const response = await apiClient.delete(`/projects/${id}/admin-delete`);
    return response;
  },

  /**
   * Increment project views (public)
   * @param {string} id
   * @returns {Promise<import('axios').AxiosResponse<any>>}
   */
  incrementViews: async (id) => {
    const response = await apiClient.post(`/projects/${id}/view`);
    return response;
  },
};

export default projectAPI;
