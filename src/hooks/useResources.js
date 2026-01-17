/**
 * useResources Hook
 * Study materials, mock tests, interview experiences management
 */
import { useState, useCallback } from 'react';
import { resourcesAPI as resourcesApi } from '../api';
import { toast } from '../utils/toast';

export const useResources = () => {
  const [resources, setResources] = useState([]);
  const [resource, setResource] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResources = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await resourcesApi.getResources(params);
      setResources(data.resources || data.data || []);
      if (data.pagination) {
        setPagination(data.pagination);
      }
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch resources';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchResource = useCallback(async (resourceId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await resourcesApi.getResource(resourceId);
      setResource(data.resource || data.data);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch resource';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPopularResources = useCallback(async (limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await resourcesApi.getPopularResources(limit);
      return data.resources || data.data || [];
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch popular resources';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchInterviewExperiences = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await resourcesApi.getInterviewExperiences(params);
      setResources(data.resources || data.data || []);
      if (data.pagination) {
        setPagination(data.pagination);
      }
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch experiences';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createResource = useCallback(async (resourceData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await resourcesApi.createResource(resourceData);
      toast.success('Resource created successfully');
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create resource';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateResource = useCallback(async (resourceId, resourceData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await resourcesApi.updateResource(resourceId, resourceData);
      toast.success('Resource updated successfully');
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update resource';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteResource = useCallback(async (resourceId) => {
    setLoading(true);
    try {
      await resourcesApi.deleteResource(resourceId);
      setResources((prev) => prev.filter((r) => r._id !== resourceId));
      toast.success('Resource deleted successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete resource');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const approveResource = useCallback(async (resourceId) => {
    setLoading(true);
    try {
      const data = await resourcesApi.approveResource(resourceId);
      toast.success('Resource approved');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to approve resource');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const likeResource = useCallback(async (resourceId) => {
    try {
      const data = await resourcesApi.likeResource(resourceId);
      setResources((prev) =>
        prev.map((r) => (r._id === resourceId ? { ...r, likes: (r.likes || 0) + 1 } : r))
      );
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to like resource');
      throw err;
    }
  }, []);

  const trackDownload = useCallback(async (resourceId) => {
    try {
      await resourcesApi.trackDownload(resourceId);
      setResources((prev) =>
        prev.map((r) => (r._id === resourceId ? { ...r, downloads: (r.downloads || 0) + 1 } : r))
      );
    } catch {
      // Silent fail for tracking
    }
  }, []);

  return {
    resources,
    resource,
    pagination,
    loading,
    error,
    fetchResources,
    fetchResource,
    fetchPopularResources,
    fetchInterviewExperiences,
    createResource,
    updateResource,
    deleteResource,
    approveResource,
    likeResource,
    trackDownload,
    setResource,
  };
};

export default useResources;
