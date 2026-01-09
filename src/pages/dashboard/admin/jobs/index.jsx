/**
 * Admin Jobs Management Page
 * Manage job postings, approvals, and status
 */
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
  Chip,
  Button,
  Input,
  Select,
  SelectItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Skeleton,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from '@heroui/react';
import { toast } from '../../../../utils/toast';
import { useJobs } from '../../../../hooks';
import { formatDate, formatPackage } from '../../../../utils/helpers';
import { JOB_STATUS, JOB_TYPES } from '../../../../constants/api.constants';

const statusColorMap = {
  Draft: 'default',
  'Pending Approval': 'warning',
  Published: 'success',
  Closed: 'secondary',
  Cancelled: 'danger',
};

const AdminJobs = () => {
  const { jobs, pagination, loading, fetchAllJobs, updateJobStatus, deleteJob } = useJobs();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedJob, setSelectedJob] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    type: '',
    page: 1,
  });

  useEffect(() => {
    fetchAllJobs({
      page: filters.page,
      limit: 10,
      search: filters.search || undefined,
      status: filters.status || undefined,
      type: filters.type || undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.page]);

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, page: 1 }));
    fetchAllJobs({
      page: 1,
      limit: 10,
      search: filters.search || undefined,
      status: filters.status || undefined,
      type: filters.type || undefined,
    });
  };

  const openActionModal = (job, action) => {
    setSelectedJob(job);
    setActionType(action);
    setRemarks('');
    onOpen();
  };

  const handleAction = async () => {
    if (!selectedJob) return;
    
    setActionLoading(true);
    try {
      if (actionType === 'delete') {
        await deleteJob(selectedJob._id);
        toast.success('Job deleted successfully');
      } else {
        await updateJobStatus(selectedJob._id, actionType, remarks);
        toast.success(`Job ${actionType === 'Published' ? 'approved' : actionType.toLowerCase()} successfully`);
      }
      onClose();
      handleSearch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    { key: 'title', label: 'Job Title' },
    { key: 'company', label: 'Company' },
    { key: 'type', label: 'Type' },
    { key: 'package', label: 'Package' },
    { key: 'deadline', label: 'Deadline' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions' },
  ];

  const renderCell = (job, columnKey) => {
    switch (columnKey) {
      case 'title':
        return (
          <div>
            <p className="font-medium">{job.title}</p>
            <p className="text-xs text-default-400">{job.location || 'Location N/A'}</p>
          </div>
        );
      case 'company':
        return job.company;
      case 'type':
        return <Chip size="sm" variant="flat">{job.type}</Chip>;
      case 'package':
        return formatPackage(job.compensation?.ctc);
      case 'deadline':
        return formatDate(job.applicationDeadline);
      case 'status':
        return (
          <Chip 
            size="sm" 
            color={statusColorMap[job.status] || 'default'}
            variant="flat"
          >
            {job.status}
          </Chip>
        );
      case 'actions':
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Job actions">
              <DropdownItem key="view">View Details</DropdownItem>
              {job.status === 'Pending Approval' && (
                <DropdownItem key="approve" onPress={() => openActionModal(job, 'Published')}>
                  Approve
                </DropdownItem>
              )}
              {job.status === 'Published' && (
                <DropdownItem key="close" onPress={() => openActionModal(job, 'Closed')}>
                  Close Job
                </DropdownItem>
              )}
              {job.status !== 'Cancelled' && (
                <DropdownItem 
                  key="cancel" 
                  className="text-warning"
                  onPress={() => openActionModal(job, 'Cancelled')}
                >
                  Cancel
                </DropdownItem>
              )}
              <DropdownItem 
                key="delete" 
                className="text-danger"
                onPress={() => openActionModal(job, 'delete')}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return job[columnKey];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Job Management</h1>
          <p className="text-default-500">Manage and approve job postings</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search jobs..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              startContent={
                <svg className="w-4 h-4 text-default-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              className="flex-1"
            />
            <Select
              placeholder="Status"
              selectedKeys={filters.status ? [filters.status] : []}
              onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
              className="w-full md:w-44"
            >
              {Object.values(JOB_STATUS).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </Select>
            <Select
              placeholder="Type"
              selectedKeys={filters.type ? [filters.type] : []}
              onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
              className="w-full md:w-40"
            >
              {Object.values(JOB_TYPES).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </Select>
            <Button color="primary" onPress={handleSearch}>
              Search
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardBody className="p-0">
          <Table aria-label="Jobs table" removeWrapper>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={jobs}
              isLoading={loading}
              loadingContent={<Skeleton className="w-full h-10" />}
              emptyContent="No jobs found"
            >
              {(job) => (
                <TableRow key={job._id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(job, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center">
          <Pagination
            total={pagination.pages}
            page={filters.page}
            onChange={(page) => setFilters((prev) => ({ ...prev, page }))}
          />
        </div>
      )}

      {/* Action Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            {actionType === 'delete' ? 'Delete Job' : 
             actionType === 'Published' ? 'Approve Job' :
             actionType === 'Closed' ? 'Close Job' : 'Cancel Job'}
          </ModalHeader>
          <ModalBody>
            <p className="text-default-500">
              {actionType === 'delete' 
                ? `Are you sure you want to delete "${selectedJob?.title}"? This action cannot be undone.`
                : `Are you sure you want to ${actionType === 'Published' ? 'approve' : actionType?.toLowerCase()} this job posting?`}
            </p>
            {actionType !== 'delete' && (
              <Textarea
                label="Remarks (optional)"
                placeholder="Add any notes or reasons..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button 
              color={actionType === 'delete' || actionType === 'Cancelled' ? 'danger' : 'primary'} 
              isLoading={actionLoading}
              onPress={handleAction}
            >
              {actionType === 'delete' ? 'Delete' : 
               actionType === 'Published' ? 'Approve' : 'Confirm'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminJobs;
