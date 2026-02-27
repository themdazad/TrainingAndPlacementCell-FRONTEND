import { useCallback, useState } from 'react';
import { projectAPI } from '../../api';

const useProjects = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (requestFn) => {
    setLoading(true);
    setError(null);
    try {
      const response = await requestFn();
      setData(response?.data?.data ?? null);
      return response;
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || 'Request failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPublishedProjects = useCallback(
    (params = {}) => execute(() => projectAPI.getPublishedProjects(params)),
    [execute]
  );

  const createProject = useCallback(
    (payload) => execute(() => projectAPI.createProject(payload)),
    [execute]
  );

  const getMyProjects = useCallback(
    (params = {}) => execute(() => projectAPI.getMyProjects(params)),
    [execute]
  );

  const getProjectById = useCallback(
    (id) => execute(() => projectAPI.getProjectById(id)),
    [execute]
  );

  const updateProject = useCallback(
    (id, payload) => execute(() => projectAPI.updateProject(id, payload)),
    [execute]
  );

  const deleteProject = useCallback((id) => execute(() => projectAPI.deleteProject(id)), [execute]);

  const getAllProjects = useCallback(
    (params = {}) => execute(() => projectAPI.getAllProjects(params)),
    [execute]
  );

  const approveProject = useCallback(
    (id, payload) => execute(() => projectAPI.approveProject(id, payload)),
    [execute]
  );

  const publishProject = useCallback(
    (id) => execute(() => projectAPI.publishProject(id)),
    [execute]
  );

  const archiveProject = useCallback(
    (id) => execute(() => projectAPI.archiveProject(id)),
    [execute]
  );

  const suspendProject = useCallback(
    (id) => execute(() => projectAPI.suspendProject(id)),
    [execute]
  );

  const adminDeleteProject = useCallback(
    (id) => execute(() => projectAPI.adminDeleteProject(id)),
    [execute]
  );

  const incrementViews = useCallback(
    (id) => execute(() => projectAPI.incrementViews(id)),
    [execute]
  );

  return {
    data,
    loading,
    error,
    execute,
    getPublishedProjects,
    createProject,
    getMyProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getAllProjects,
    approveProject,
    publishProject,
    archiveProject,
    suspendProject,
    adminDeleteProject,
    incrementViews,
  };
};

export default useProjects;
