import api from '../config';

export const createStudentProfile = async (data) => {
  const response = await api.post('/students', data);
  return response.data;
};
export const getStudentProfile = async () => {
  const response = await api.get(`/students`);
  return response.data;
};
export const getStudentProfileByUserId = async (userId) => {
  const response = await api.get(`/students/user/${userId}`);
  return response.data;
};
export const updateStudentProfile = async (data) => {
  const response = await api.put('/students', data);
  return response.data;
};
export const deleteStudentProfile = async () => {
  const response = await api.delete('/students');
  return response.data;
};
