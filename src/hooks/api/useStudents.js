import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import {
  getStudentProfile,
  getStudentProfileByUserId,
  createStudentProfile,
  updateStudentProfile as updateStudentProfileAPI,
  deleteStudentProfile,
} from '../../api/services/students.api';

const useStudents = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStudentProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStudentProfile();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      toast.error('Failed to fetch student profile.');
      throw err;
    }
  }, []);

  const updateStudentProfile = useCallback(async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateStudentProfileAPI(profileData);
      setLoading(false);
      toast.success('Student profile updated successfully.');
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      toast.error('Failed to update student profile.');
      throw err;
    }
  }, []);

  return {
    fetchStudentProfile,
    updateStudentProfile,
    loading,
    error,
  };
};

export default useStudents;
