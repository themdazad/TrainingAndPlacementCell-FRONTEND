/**
 * useJobs Hook
 * Job listing and management
 */
import { useState, useCallback } from 'react';
import { jobsAPI as jobsApi } from '../api';
import { toast } from '../utils/toast';

export const useJobs = (initialParams = {}) => {
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(
    async (params = {}) => {
      setLoading(true);
      setError(null);
      try {
        const data = await jobsApi.getJobs({ ...initialParams, ...params });
        setJobs(data.jobs || data.data || []);
        if (data.pagination) {
          setPagination(data.pagination);
        }
        return data;
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch jobs';
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [initialParams]
  );

  const fetchJob = useCallback(async (jobId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobsApi.getJob(jobId);
      setJob(data.job || data.data);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch job';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEligibleJobs = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobsApi.getEligibleJobs(params);
      setJobs(data.jobs || data.data || []);
      if (data.pagination) {
        setPagination(data.pagination);
      }
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch eligible jobs';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createJob = useCallback(async (jobData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobsApi.createJob(jobData);
      toast.success('Job created successfully');
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create job';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateJob = useCallback(async (jobId, jobData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobsApi.updateJob(jobId, jobData);
      toast.success('Job updated successfully');
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update job';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const publishJob = useCallback(async (jobId) => {
    setLoading(true);
    try {
      const data = await jobsApi.publishJob(jobId);
      toast.success('Job published successfully');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to publish job');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const closeJob = useCallback(async (jobId) => {
    setLoading(true);
    try {
      const data = await jobsApi.closeJob(jobId);
      toast.success('Job closed successfully');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to close job');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteJob = useCallback(async (jobId) => {
    setLoading(true);
    try {
      await jobsApi.deleteJob(jobId);
      setJobs((prev) => prev.filter((j) => j._id !== jobId));
      toast.success('Job deleted successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete job');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const approveJob = useCallback(async (jobId) => {
    setLoading(true);
    try {
      const data = await jobsApi.approveJob(jobId);
      toast.success('Job approved successfully');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to approve job');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    jobs,
    job,
    pagination,
    loading,
    error,
    fetchJobs,
    fetchJob,
    fetchEligibleJobs,
    createJob,
    updateJob,
    publishJob,
    closeJob,
    deleteJob,
    approveJob,
    setJob,
  };
};

export default useJobs;
