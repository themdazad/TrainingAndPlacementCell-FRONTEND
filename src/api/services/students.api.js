import api from '../config';

const studentApi = {
  createStudentProfile: async (data) => {
    const response = await api.post('/students', data);
    return response.data;
  },
  getStudentProfile: async (studentId) => {
    const response = await api.get(`/students/${studentId}`);
    return response.data;
  },
  getStudentProfileByUserId: async (userId) => {
    const response = await api.get(`/students/user/${userId}`);
    return response.data;
  },
  updateStudentProfile: async (data) => {
    const response = await api.put('/students', data);
    return response.data;
  },
  deleteStudentProfile: async () => {
    const response = await api.delete('/students');
    return response.data;
  },
};
export default studentApi;
