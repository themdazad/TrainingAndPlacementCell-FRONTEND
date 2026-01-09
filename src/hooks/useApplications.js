/**
 * useApplications Hook
 * Job application management
 */
import { useState, useCallback } from 'react';
import { applicationsAPI as applicationsApi } from '../api';
import { toast } from '../utils/toast';

export const useApplications = () => {
  const [applications, setApplications] = useState([]);
  const [application, setApplication] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const applyToJob = useCallback(async (jobId, applicationData = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await applicationsApi.applyToJob(jobId, applicationData);
      toast.success('Application submitted successfully');
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to apply';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMyApplications = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await applicationsApi.getMyApplications(params);
      setApplications(data.applications || data.data || []);
      if (data.pagination) {
        setPagination(data.pagination);
      }
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch applications';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJobApplications = useCallback(async (jobId, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await applicationsApi.getJobApplications(jobId, params);
      setApplications(data.applications || data.data || []);
      if (data.pagination) {
        setPagination(data.pagination);
      }
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch applications';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchApplication = useCallback(async (applicationId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await applicationsApi.getApplication(applicationId);
      setApplication(data.application || data.data);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch application';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = useCallback(async (applicationId, status, remarks = '') => {
    setLoading(true);
    setError(null);
    try {
      const data = await applicationsApi.updateStatus(applicationId, status, remarks);
      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status } : app
        )
      );
      toast.success(`Application ${status.toLowerCase()}`);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update status';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const withdrawApplication = useCallback(async (applicationId) => {
    setLoading(true);
    try {
      await applicationsApi.withdrawApplication(applicationId);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: 'Withdrawn' } : app
        )
      );
      toast.success('Application withdrawn');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to withdraw application');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const scheduleInterview = useCallback(async (applicationId, interviewData) => {
    setLoading(true);
    try {
      const data = await applicationsApi.scheduleInterview(applicationId, interviewData);
      toast.success('Interview scheduled');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to schedule interview');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const recordOffer = useCallback(async (applicationId, offerData) => {
    setLoading(true);
    try {
      const data = await applicationsApi.recordOffer(applicationId, offerData);
      toast.success('Offer recorded');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to record offer');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const bulkUpdateStatus = useCallback(async (applicationIds, status, remarks = '') => {
    setLoading(true);
    try {
      const data = await applicationsApi.bulkUpdateStatus(applicationIds, status, remarks);
      toast.success(`${applicationIds.length} applications updated`);
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update applications');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    applications,
    application,
    pagination,
    loading,
    error,
    applyToJob,
    fetchMyApplications,
    fetchJobApplications,
    fetchApplication,
    updateStatus,
    withdrawApplication,
    scheduleInterview,
    recordOffer,
    bulkUpdateStatus,
    setApplication,
  };
};

export default useApplications;
