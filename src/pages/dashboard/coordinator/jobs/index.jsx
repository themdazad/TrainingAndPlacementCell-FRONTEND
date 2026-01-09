/**
 * Coordinator Jobs Page
 * View and manage job postings assigned to coordinator
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
  Skeleton,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
} from '@heroui/react';
import { useJobs } from '../../../../hooks';
import { formatDate, formatPackage } from '../../../../utils/helpers';
import { JOB_TYPES } from '../../../../constants/api.constants';

const statusColorMap = {
  Draft: 'default',
  'Pending Approval': 'warning',
  Published: 'success',
  Closed: 'secondary',
  Cancelled: 'danger',
};

const CoordinatorJobs = () => {
  const { jobs, pagination, loading, fetchAllJobs } = useJobs();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedTab, setSelectedTab] = useState('active');

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    page: 1,
  });

  useEffect(() => {
    const statusFilter = selectedTab === 'active' ? 'Published' : 
                         selectedTab === 'pending' ? 'Pending Approval' : '';
    fetchAllJobs({
      page: filters.page,
      limit: 10,
      search: filters.search || undefined,
      status: statusFilter || filters.status || undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.page, selectedTab]);

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, page: 1 }));
    const statusFilter = selectedTab === 'active' ? 'Published' : 
                         selectedTab === 'pending' ? 'Pending Approval' : '';
    fetchAllJobs({
      page: 1,
      limit: 10,
      search: filters.search || undefined,
      status: statusFilter || filters.status || undefined,
    });
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    onOpen();
  };

  const columns = [
    { key: 'title', label: 'Job Title' },
    { key: 'company', label: 'Company' },
    { key: 'type', label: 'Type' },
    { key: 'applications', label: 'Applications' },
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
      case 'applications':
        return (
          <div className="text-center">
            <span className="font-semibold">{job.applicationsCount || 0}</span>
          </div>
        );
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
          <div className="flex gap-1">
            <Button size="sm" variant="light" onPress={() => handleViewDetails(job)}>
              View
            </Button>
            <Button size="sm" color="primary" variant="flat">
              Applications
            </Button>
          </div>
        );
      default:
        return job[columnKey];
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Job Management</h1>
        <p className="text-default-500">Monitor and manage job postings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold">{pagination.total || 0}</p>
            <p className="text-sm text-default-500">Total Jobs</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-success">
              {jobs.filter(j => j.status === 'Published').length}
            </p>
            <p className="text-sm text-default-500">Active</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-warning">
              {jobs.filter(j => j.status === 'Pending Approval').length}
            </p>
            <p className="text-sm text-default-500">Pending</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-4">
            <p className="text-2xl font-bold text-primary">
              {jobs.reduce((sum, j) => sum + (j.applicationsCount || 0), 0)}
            </p>
            <p className="text-sm text-default-500">Total Applications</p>
          </CardBody>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab}
        color="primary"
        variant="underlined"
      >
        <Tab key="active" title="Active Jobs" />
        <Tab key="pending" title="Pending Approval" />
        <Tab key="all" title="All Jobs" />
      </Tabs>

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
              placeholder="Job Type"
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

      {/* Job Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>Job Details</ModalHeader>
          <ModalBody>
            {selectedJob && (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedJob.title}</h3>
                    <p className="text-default-500">{selectedJob.company}</p>
                  </div>
                  <Chip color={statusColorMap[selectedJob.status]} variant="flat">
                    {selectedJob.status}
                  </Chip>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-default-400">Type</p>
                    <p className="font-medium">{selectedJob.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-400">Location</p>
                    <p className="font-medium">{selectedJob.location || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-400">Package</p>
                    <p className="font-medium text-success">{formatPackage(selectedJob.compensation?.ctc)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-400">Applications</p>
                    <p className="font-medium">{selectedJob.applicationsCount || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-400">Deadline</p>
                    <p className="font-medium">{formatDate(selectedJob.applicationDeadline)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-default-400">Openings</p>
                    <p className="font-medium">{selectedJob.openings || 1}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-default-400 mb-2">Description</p>
                  <p className="text-default-600">{selectedJob.description}</p>
                </div>

                {selectedJob.skillsRequired?.length > 0 && (
                  <div>
                    <p className="text-sm text-default-400 mb-2">Required Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skillsRequired.map((skill) => (
                        <Chip key={skill} size="sm" variant="bordered">{skill}</Chip>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary">
              View Applications
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CoordinatorJobs;
