import { useEffect, useMemo, useState } from 'react';
import {
  Card,
  CardBody,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/react';
import { toast } from 'sonner';
import { useProjects } from '../../../../hooks/api';
import { PROJECT_STATUS, PROJECT_STATUS_COLORS } from '../../../../constants/api.constants';

const defaultForm = {
  title: '',
  description: '',
  technologiesText: '',
  liveDemo: '',
  repository: '',
  documentation: '',
};

const StudentProjects = () => {
  const { getMyProjects, createProject, updateProject, deleteProject, loading } = useProjects();
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [statusFilter, setStatusFilter] = useState('');
  const [form, setForm] = useState(defaultForm);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const isEditing = useMemo(() => Boolean(selectedProject?._id), [selectedProject]);

  const loadProjects = async (nextPage = page, nextStatus = statusFilter) => {
    try {
      const response = await getMyProjects({
        page: nextPage,
        limit: 10,
        status: nextStatus || undefined,
      });
      const payload = response?.data?.data;
      setProjects(payload?.projects || []);
      setPagination(payload?.pagination || { page: 1, pages: 1, total: 0 });
    } catch {
      toast.error('Failed to fetch your projects');
    }
  };

  useEffect(() => {
    loadProjects(page, statusFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const openCreateModal = () => {
    setSelectedProject(null);
    setForm(defaultForm);
    onOpen();
  };

  const openEditModal = (project) => {
    setSelectedProject(project);
    setForm({
      title: project.title || '',
      description: project.description || '',
      technologiesText: (project.technologies || []).join(', '),
      liveDemo: project?.links?.liveDemo || '',
      repository: project?.links?.repository || '',
      documentation: project?.links?.documentation || '',
    });
    onOpen();
  };

  const handleSaveProject = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast.error('Title and description are required');
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      technologies: form.technologiesText
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
      links: {
        liveDemo: form.liveDemo || undefined,
        repository: form.repository || undefined,
        documentation: form.documentation || undefined,
      },
    };

    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateProject(selectedProject._id, payload);
        toast.success('Project updated successfully');
      } else {
        await createProject(payload);
        toast.success('Project created successfully');
      }
      onClose();
      setForm(defaultForm);
      setSelectedProject(null);
      await loadProjects(page, statusFilter);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await deleteProject(projectId);
      toast.success('Project deleted successfully');
      await loadProjects(page, statusFilter);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete project');
    }
  };

  const applyStatusFilter = (nextStatus) => {
    setStatusFilter(nextStatus);
    setPage(1);
    loadProjects(1, nextStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">My Projects</h1>
          <p className="text-default-500">Create and manage your project submissions</p>
        </div>
        <Button color="primary" onPress={openCreateModal}>
          + Add Project
        </Button>
      </div>

      <Card>
        <CardBody className="flex flex-col md:flex-row gap-3">
          <Select
            label="Status"
            selectedKeys={statusFilter ? [statusFilter] : []}
            onChange={(event) => applyStatusFilter(event.target.value)}
            className="w-full md:w-56"
            placeholder="All statuses"
          >
            {Object.values(PROJECT_STATUS).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </Select>
          <Button
            variant="flat"
            onPress={() => applyStatusFilter('')}
            className="w-full md:w-auto md:self-end"
          >
            Clear Filter
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="p-0">
          <Table aria-label="My projects table" removeWrapper>
            <TableHeader>
              <TableColumn>TITLE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>TECHNOLOGIES</TableColumn>
              <TableColumn>VIEWS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody isLoading={loading} items={projects} emptyContent="No projects found">
              {(project) => (
                <TableRow key={project._id}>
                  <TableCell>
                    <div className="max-w-sm">
                      <p className="font-medium truncate">{project.title}</p>
                      <p className="text-xs text-default-500 line-clamp-2">{project.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      color={PROJECT_STATUS_COLORS[project.status] || 'default'}
                      variant="flat"
                    >
                      {project.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {(project.technologies || []).slice(0, 3).map((tech) => (
                        <Chip key={tech} size="sm" variant="dot">
                          {tech}
                        </Chip>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{project.views || 0}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="flat"
                        color="primary"
                        onPress={() => openEditModal(project)}
                        isDisabled={project.status !== PROJECT_STATUS.DRAFT}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        color="danger"
                        onPress={() => handleDelete(project._id)}
                        isDisabled={project.status !== PROJECT_STATUS.DRAFT}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {pagination.pages > 1 && (
        <div className="flex justify-center">
          <Pagination page={page} total={pagination.pages} onChange={setPage} showControls />
        </div>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>{isEditing ? 'Edit Project' : 'Create Project'}</ModalHeader>
          <ModalBody className="space-y-4">
            <Input
              label="Project Title"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              isRequired
            />
            <Textarea
              label="Description"
              value={form.description}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, description: event.target.value }))
              }
              minRows={4}
              isRequired
            />
            <Input
              label="Technologies"
              placeholder="React, Node.js, MongoDB"
              value={form.technologiesText}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, technologiesText: event.target.value }))
              }
            />
            <Input
              label="Live Demo URL"
              value={form.liveDemo}
              onChange={(event) => setForm((prev) => ({ ...prev, liveDemo: event.target.value }))}
            />
            <Input
              label="Repository URL"
              value={form.repository}
              onChange={(event) => setForm((prev) => ({ ...prev, repository: event.target.value }))}
            />
            <Input
              label="Documentation URL"
              value={form.documentation}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, documentation: event.target.value }))
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSaveProject} isLoading={isSubmitting}>
              {isEditing ? 'Update Project' : 'Create Project'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default StudentProjects;
