import { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Select,
  SelectItem,
  Chip,
  Pagination,
  Textarea,
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

const AdminProjects = () => {
  const { getAllProjects, approveProject, publishProject, archiveProject, loading } = useProjects();
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    isPublished: '',
    page: 1,
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState(PROJECT_STATUS.APPROVED);
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loadProjects = async (nextFilters = filters) => {
    try {
      const response = await getAllProjects({
        page: nextFilters.page,
        limit: 10,
        status: nextFilters.status || undefined,
        isPublished: nextFilters.isPublished || undefined,
        search: nextFilters.search || undefined,
      });
      const payload = response?.data?.data;
      setProjects(payload?.projects || []);
      setPagination(payload?.pagination || { page: 1, pages: 1, total: 0 });
    } catch {
      toast.error('Failed to fetch projects');
    }
  };

  useEffect(() => {
    loadProjects(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.page]);

  const handleSearch = () => {
    const nextFilters = { ...filters, page: 1 };
    setFilters(nextFilters);
    loadProjects(nextFilters);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const openApprovalModal = (project, targetStatus) => {
    setSelectedProject(project);
    setApprovalStatus(targetStatus);
    setRemarks('');
    onOpen();
  };

  const handleApproveOrReject = async () => {
    if (!selectedProject) return;
    setIsSubmitting(true);
    try {
      await approveProject(selectedProject._id, { approvalStatus, remarks });
      toast.success(`Project ${approvalStatus.toLowerCase()} successfully`);
      onClose();
      setSelectedProject(null);
      await loadProjects(filters);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update project approval');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = async (id) => {
    try {
      await publishProject(id);
      toast.success('Project published successfully');
      await loadProjects(filters);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to publish project');
    }
  };

  const handleArchive = async (id) => {
    try {
      await archiveProject(id);
      toast.success('Project archived successfully');
      await loadProjects(filters);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to archive project');
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'student', label: 'Student' },
    { key: 'status', label: 'Status' },
    { key: 'visibility', label: 'Visibility' },
    { key: 'views', label: 'Views' },
    { key: 'actions', label: 'Actions' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Projects Moderation</h1>
        <p className="text-default-500">Review, approve, publish, and archive student projects</p>
      </div>

      <Card>
        <CardBody>
          <div className="flex flex-col lg:flex-row gap-3">
            <Input
              placeholder="Search by title or description"
              value={filters.search}
              onChange={(event) => handleFilterChange('search', event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Select
              placeholder="Status"
              selectedKeys={filters.status ? [filters.status] : []}
              onChange={(event) => handleFilterChange('status', event.target.value)}
              className="w-full lg:w-44"
            >
              {Object.values(PROJECT_STATUS).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </Select>
            <Select
              placeholder="Visibility"
              selectedKeys={filters.isPublished ? [filters.isPublished] : []}
              onChange={(event) => handleFilterChange('isPublished', event.target.value)}
              className="w-full lg:w-44"
            >
              <SelectItem key="true" value="true">
                Published
              </SelectItem>
              <SelectItem key="false" value="false">
                Unpublished
              </SelectItem>
            </Select>
            <Button color="primary" onPress={handleSearch}>
              Search
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="p-0">
          <Table aria-label="Admin projects table" removeWrapper>
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={projects} isLoading={loading} emptyContent="No projects found">
              {(project) => (
                <TableRow key={project._id}>
                  <TableCell>
                    <div className="max-w-sm">
                      <p className="font-medium truncate">{project.title}</p>
                      <p className="text-xs text-default-500 line-clamp-2">{project.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {project?.uploadedBy?.personalInfo?.fullName || 'Student'}
                    <p className="text-xs text-default-500">
                      {project?.uploadedBy?.academicInfo?.registrationNumber || '-'}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      color={PROJECT_STATUS_COLORS[project.status] || 'default'}
                      variant="flat"
                    >
                      {project.status}
                    </Chip>
                    {project.approvalRemarks && (
                      <p className="text-xs text-default-500 mt-1 line-clamp-1">
                        {project.approvalRemarks}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      color={project.isPublished ? 'success' : 'default'}
                      variant="dot"
                    >
                      {project.isPublished ? 'Published' : 'Private'}
                    </Chip>
                  </TableCell>
                  <TableCell>{project.views || 0}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      <Button
                        size="sm"
                        color="success"
                        variant="flat"
                        onPress={() => openApprovalModal(project, PROJECT_STATUS.APPROVED)}
                        isDisabled={project.status === PROJECT_STATUS.PUBLISHED}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        onPress={() => openApprovalModal(project, PROJECT_STATUS.REJECTED)}
                        isDisabled={project.status === PROJECT_STATUS.PUBLISHED}
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        onPress={() => handlePublish(project._id)}
                        isDisabled={project.status !== PROJECT_STATUS.APPROVED}
                      >
                        Publish
                      </Button>
                      <Button
                        size="sm"
                        color="warning"
                        variant="flat"
                        onPress={() => handleArchive(project._id)}
                        isDisabled={project.status === PROJECT_STATUS.ARCHIVED}
                      >
                        Archive
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
          <Pagination
            page={filters.page}
            total={pagination.pages}
            onChange={(value) => setFilters((prev) => ({ ...prev, page: value }))}
            showControls
          />
        </div>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            {approvalStatus === PROJECT_STATUS.APPROVED ? 'Approve Project' : 'Reject Project'}
          </ModalHeader>
          <ModalBody>
            <p className="text-sm text-default-600">
              {selectedProject?.title ? `Project: ${selectedProject.title}` : ''}
            </p>
            <Textarea
              label="Remarks"
              value={remarks}
              onChange={(event) => setRemarks(event.target.value)}
              placeholder="Optional review remarks"
              minRows={3}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color={approvalStatus === PROJECT_STATUS.APPROVED ? 'success' : 'danger'}
              onPress={handleApproveOrReject}
              isLoading={isSubmitting}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminProjects;
