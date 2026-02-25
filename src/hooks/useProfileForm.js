/**
 * useProfileForm Hook
 * Manages student profile form state and operations
 */
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectUser, selectProfile } from '../store/authSlice';
import useStudents from './api/useStudents';

const useProfileForm = () => {
  const user = useSelector(selectUser);
  const profile = useSelector(selectProfile);
  const { fetchStudentProfile, updateStudentProfile } = useStudents();

  const [loading, setLoading] = useState(false);
  const [studentProfile, setStudentProfile] = useState(null);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
    },
    academicInfo: {
      registrationNumber: '',
      course: null,
      backlogs: 0,
    },
    bio: '',
    skills: [],
    placementStatus: 'Seeking',
    isEligible: true,
    socialLinks: {
      linkedIn: '',
      github: '',
      portfolio: '',
    },
  });

  // Fetch student profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.id) {
        const response = await fetchStudentProfile();
        setStudentProfile(response.data);
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Initialize form data from profile
  useEffect(() => {
    if (studentProfile) {
      const newFormData = {
        personalInfo: {
          fullName: studentProfile?.personalInfo?.fullName || studentProfile?.fullName || '',
        },
        academicInfo: {
          registrationNumber: studentProfile?.academicInfo?.registrationNumber || '',
          course: studentProfile?.academicInfo?.course || null,
          backlogs: studentProfile?.academicInfo?.backlogs || 0,
        },
        bio: studentProfile?.bio || '',
        skills: Array.isArray(studentProfile?.skills) ? studentProfile.skills : [],
        placementStatus: studentProfile?.placementStatus || 'Seeking',
        isEligible: studentProfile?.isEligible || true,
        socialLinks: {
          linkedIn: studentProfile?.socialLinks?.linkedIn || studentProfile?.links?.linkedin || '',
          github: studentProfile?.socialLinks?.github || studentProfile?.links?.github || '',
          portfolio:
            studentProfile?.socialLinks?.portfolio || studentProfile?.links?.portfolio || '',
        },
      };
      setFormData(newFormData);
    }
  }, [studentProfile]);

  /**
   * Handles input changes for both flat and nested fields
   * @param {string} field - Field name (supports dot notation for nested fields)
   * @param {any} value - New value for the field
   */
  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => {
      if (field.includes('.')) {
        // Handle nested fields like "personalInfo.fullName"
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        };
      }

      // Handle skills array conversion
      if (field === 'skills') {
        return {
          ...prev,
          [field]:
            typeof value === 'string'
              ? value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean)
              : value,
        };
      }

      // Handle top-level fields
      return { ...prev, [field]: value };
    });
  }, []);

  /**
   * Saves the profile changes
   * @returns {Promise<boolean>} Success status
   */
  const handleSave = useCallback(async () => {
    setLoading(true);
    try {
      const updateData = {
        personalInfo: formData.personalInfo,
        academicInfo: formData.academicInfo,
        bio: formData.bio,
        skills: Array.isArray(formData.skills) ? formData.skills : [],
        placementStatus: formData.placementStatus,
        isEligible: formData.isEligible,
        socialLinks: formData.socialLinks,
      };

      await updateStudentProfile(updateData);

      // Refetch the profile to update the UI
      const updatedProfile = await fetchStudentProfile();
      if (updatedProfile) {
        setStudentProfile(updatedProfile.data);
      }

      return true;
    } catch (error) {
      // Error is already handled in the hook
      return false;
    } finally {
      setLoading(false);
    }
  }, [formData, updateStudentProfile, fetchStudentProfile]);

  /**
   * Saves a specific section of the profile
   * @param {Object} sectionData - Data for the specific section to update
   * @returns {Promise<boolean>} Success status
   */
  const handleSectionSave = useCallback(
    async (sectionData) => {
      setLoading(true);
      try {
        // Merge the section data with existing student profile
        const updateData = {
          ...studentProfile,
          ...sectionData,
        };

        await updateStudentProfile(updateData);

        // Refetch the profile to update the UI
        const updatedProfile = await fetchStudentProfile();
        if (updatedProfile) {
          setStudentProfile(updatedProfile.data);
        }

        return true;
      } catch (error) {
        // Error is already handled in the hook
        return false;
      } finally {
        setLoading(false);
      }
    },
    [studentProfile, updateStudentProfile, fetchStudentProfile]
  );

  return {
    user,
    profile,
    studentProfile,
    formData,
    loading,
    handleInputChange,
    handleSave,
    handleSectionSave,
  };
};

export default useProfileForm;
